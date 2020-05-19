import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import StateWiseRow from './StateWiseRow';
import { getDistrictWiseData } from '../../services/patients.service';
import SortIcon from './SortIcon';
import { sendEventToGA } from '../../services/analytics.service';
import { idb } from '../../services/idb.service';
import useNotificationsPermission from '../../hooks/useNotificationsPermissions';
import Modal from '../Modal';
import { askUserPermissions, subscribeUser } from '../../services/subscription.service';
import BellIcon from './BellIcon';

const promptMsg = <p>You need to allow permissions to get Notifications. When prompted click 'Allow' to get notifications</p>;
const blockedMsg = (
  <p>
    Seems like you have denied the message permissions, you need to click "Allow" to give permissions for notifications.
    <a href="https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DAndroid&hl=en&oco=1" target="_blank" rel="noopener noreferrer">Follow the instructions here</a>
  </p>
);
const errorMsg = <p>There was an error, please try again. It is possible that your browser doesn't support notifications.</p>;
const unsupportedMsg = <p>Seems like your browser doesn't support notifications. Make sure you are not in a private/incognito window.</p>;
const successMsg = (
  <p>
    Congratulations you have enabled notifications!
    <span role="img" aria-label="tada"> 🎉 </span>
  </p>
);
const category = 'User';
const action = 'Clicked Sorting';

const StatewiseTable = ({ statewise, statewiseTestingData, isMobile }) => {
  const stateWiseKeys = Object.keys(statewise);
  const { t } = useTranslation();
  const [stateSortObject, setStateSortObject] = useState({
    states: stateWiseKeys,
    activeSorting: '',
    currentOrder: 1,
  });
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(promptMsg);
  const [showGetNotificationButtons, setShowGetNotificationButtons] = useState(true);
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(null);
  const [statesNotificationStatus, setStatesNotificationStatus] = useState({});
  const sortStates = useCallback((key, order, stateWiseKeys) => stateWiseKeys.sort((a, b) => (
    order * (parseInt(statewise[b][key]) - parseInt(statewise[a][key]))
  )), [statewise]);

  const handleSortClick = (activeSortingNew) => {
    let currentOrderNew = stateSortObject.currentOrder;
    if (stateSortObject.activeSorting === activeSortingNew) {
      currentOrderNew *= -1;
    } else {
      currentOrderNew = 1;
    }
    const newStateKeys = sortStates(activeSortingNew, currentOrderNew, stateWiseKeys);

    setStateSortObject({
      states: newStateKeys,
      activeSorting: activeSortingNew,
      currentOrder: currentOrderNew,
    });
  };

  const getNotificationPermissions = () => {
    askUserPermissions().then((msg) => {
      sendEventToGA('Notifications', 'Enabled', 'Success');
      setModalContent(successMsg);
      setShowGetNotificationButtons(false);
    }).catch((err) => {
      switch (err.msg) {
        case 'blocked': setModalContent(blockedMsg);
          break;
        case 'browser_unsupported': setModalContent(unsupportedMsg);
          break;
        default: setModalContent(errorMsg);
      }
      setShowGetNotificationButtons(false);
      sendEventToGA('Notifications', 'Failed', 'Failed');
    });
  };

  const hasNotificationPermissions = useNotificationsPermission();
  if (hasNotificationPermissions === false) {
    idb.clear();
  }

  useEffect(() => {
    getDistrictWiseData().then((response) => {
      if (response.status === 200) {
        setDistricts(response.data);
        handleSortClick('confirmed');
        setIsLoading(false);
      } else {
        console.log('Error in API');
      }
    });
  }, []);

  useEffect(() => {
    const statesNotificationStatus = {};
    idb.keys().then((keys) => {
      if (!keys.length) {
        setAllNotificationsEnabled(false);
        return;
      }
      keys.forEach((key) => {
        switch (key) {
          case 'all_all': setAllNotificationsEnabled(true);
            break;
          default:
            setAllNotificationsEnabled(false);
            const [state_code, district_code] = key.split('_');
            if (!statesNotificationStatus[state_code]) statesNotificationStatus[state_code] = {};
            statesNotificationStatus[state_code][district_code] = true;
        }
      });
      setStatesNotificationStatus(statesNotificationStatus);
    });
  }, []);

  const handleBellClick = (stateCode, districtName, isBellActive) => subscribeUser(`${stateCode}_${districtName}`, isBellActive).then((msg) => {
    if (msg.msg_code === 'success') {
      if (stateCode === 'all' && districtName === 'all' && isBellActive) {
        setAllNotificationsEnabled(true);
      } else if (stateCode === 'all' && districtName === 'all' && !isBellActive) {
        setAllNotificationsEnabled(false);
      } else {
        const newStateStatus = {
          ...statesNotificationStatus[stateCode],
          [districtName]: isBellActive,
        };
        const newNotificaitonStatus = {
          ...statesNotificationStatus,
          [stateCode]: newStateStatus,
        };
        setStatesNotificationStatus(newNotificaitonStatus);
      }
    }
  }).catch((err) => {
    setShowModal(true);
  });
  return !isLoading && allNotificationsEnabled !== null && (
    <div className="card">
      <p className="notif-help-text">
        <span>{t('Enable Notifications for all new cases in India')}</span>
        <BellIcon
          districtName="all"
          stateCode="all"
          isBellActive={allNotificationsEnabled}
          handleBellClick={handleBellClick}
        />
      </p>
      <div className="outer">
        <div className="inner">
          <table className="statewise-cases table ">
            <thead>
              <tr>
                <th className="fixed" />
                <th className="fixed">{t('State')}</th>
                <th className="clickable-header" onClick={(e) => { handleSortClick('confirmed'); sendEventToGA(category, action, 'confirmed'); }}>
                  <div className="heading">
                    <div className="confirmed">{isMobile ? t('Cnfrm') : t('Confirmed')}</div>
                    <div className="sortIcon">
                      {stateSortObject.activeSorting === 'confirmed'
                        ? SortIcon(stateSortObject.currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th className="clickable-header" onClick={(e) => { handleSortClick('active'); sendEventToGA(category, action, 'active'); }}>
                  <div className="heading">
                    <div className="active">
                      {isMobile ? t('Actv') : t('Active')}
                      {' '}
                    </div>
                    <div className="sortIcon">
                      {stateSortObject.activeSorting === 'active'
                        ? SortIcon(stateSortObject.currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th className="clickable-header" onClick={(e) => { handleSortClick('recovered'); sendEventToGA(category, action, 'recovered'); }}>
                  <div className="heading">
                    <div className="recovered">
                      {isMobile ? t('Rcvrd') : t('Recovered')}
                      {' '}
                    </div>
                    <div className="sortIcon">
                      {stateSortObject.activeSorting === 'recovered'
                        ? SortIcon(stateSortObject.currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th className="clickable-header" onClick={(e) => { handleSortClick('deaths'); sendEventToGA(category, action, 'deaths'); }}>
                  <div className="heading">
                    <div className="deaths">
                      {isMobile ? t('Deaths') : t('Deaths')}
                      {' '}
                    </div>
                    {' '}
                    <div className="sortIcon">
                      {stateSortObject.activeSorting === 'deaths' ? SortIcon(stateSortObject.currentOrder) : null}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {stateSortObject.states.map((stateCode, index) => (
                <StateWiseRow
                  state={statewise[stateCode]}
                  allNotificationsEnabled={allNotificationsEnabled}
                  statesNotificationStatus={statesNotificationStatus[stateCode]}
                  districts={districts[stateCode]}
                  index={index + 1}
                  key={stateCode}
                  isMobile={isMobile}
                  handleBellClick={handleBellClick}
                  testingData={statewiseTestingData[stateCode]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal>
          <div className="modal text-center">
            {modalContent}
            <div className="modal-button-wrapper">
              {showGetNotificationButtons && <button className="btn" onClick={getNotificationPermissions}>Okay</button>}
              <button className="btn" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StatewiseTable;
