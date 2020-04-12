import React, { useState, useEffect, useCallback } from "react";
import StateWiseRow from "./StateWiseRow";
import { getDistrictWiseData } from "../../services/patients.service";
import SortIcon from "./SortIcon";
import { sendEventToGA } from '../../services/analytics.service'
import { idb } from "../../services/idb.service";
import useNotificationsPermission from "../../hooks/useNotificationsPermissions";
import Modal from "../Modal";
import { askUserPermissions } from "../../services/subscription.service";

const promptMsg = <p>You need to allow permissions to get Notifications. When prompted click 'Allow' to get notifications</p>;
const blockedMsg = <p>Seems like you have denied the message permissions, you need to click "Allow" to give permissions for notifications. <a href="https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DAndroid&hl=en&oco=1" target="_blank" rel="noopener noreferrer">Follow the instructions here</a></p>
const errorMsg = <p>There was an error, please try again. It is possible that your browser doesn't support notifications.</p>
const unsupportedMsg = <p>Seems like your browser doesn't support notifications. Make sure you are not in a private/incognito window.</p>
const successMsg = <p>Congratulations you have enabled notifications! <span role="img" aria-label="tada"> 🎉 </span></p>

const StatewiseTable = ({ statewise, isMobile }) => {
  const stateWiseKeys = Object.keys(statewise);
  const [stateSortObject, setStateSortObject] = useState({
    states: stateWiseKeys,
    activeSorting: "",
    currentOrder: 1
  });
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(promptMsg);
  const [showGetNotificationButtons, setShowGetNotificationButtons] = useState(true);

  const sortStates = useCallback((key, order, stateWiseKeys) => {
    return stateWiseKeys.sort((a, b) => {
      return (
        order * (parseInt(statewise[b][key]) - parseInt(statewise[a][key]))
      );
    });
  }, [statewise]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSortClick = (activeSortingNew) => {
    let currentOrderNew = stateSortObject.currentOrder;
    if (stateSortObject.activeSorting === activeSortingNew) {
      currentOrderNew = currentOrderNew * -1;
    } else {
      currentOrderNew = 1;
    }
    const newStateKeys = sortStates(activeSortingNew, currentOrderNew, stateWiseKeys);
    
    setStateSortObject({
      states: newStateKeys,
      activeSorting: activeSortingNew,
      currentOrder: currentOrderNew
    })
  }

  const getNotificationPermissions = () => {
    askUserPermissions().then(msg => {
      setModalContent(successMsg);
      setShowGetNotificationButtons(false);
    }).catch(err => {
      switch (err.msg) {
        case 'blocked': setModalContent(blockedMsg);
          break;
        case 'browser_unsupported': setModalContent(unsupportedMsg);
          break;
        default: setModalContent(errorMsg);
      }
      setShowGetNotificationButtons(false);
    })
  }

  const hasNotificationPermissions = useNotificationsPermission();
  if (hasNotificationPermissions === false) {
    idb.clear();
  }

  useEffect(() => {
    getDistrictWiseData().then(response => {
      if (response.status === 200) {
        setDistricts(response.data);
        handleSortClick("confirmed");
        setIsLoading(false);
      } else {
        console.log("Error in API");
      }
    });
  }, []);

  const category = "User";
  const action = "Clicked Sorting";

  return !isLoading && (
    <div>
      <table className="statewise-cases table card">
        <thead>
          <tr>
            <th></th>
            <th>State</th>
            <th onClick={e => { handleSortClick("confirmed"); sendEventToGA(category, action, "confirmed") }}>
              <div className="heading">
                <div>Confirmed</div>
                <div className="sortIcon">
                  {stateSortObject.activeSorting === "confirmed"
                    ? SortIcon(stateSortObject.currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { handleSortClick("recovered"); sendEventToGA(category, action, "recovered") }}>
              <div className="heading">
                <div>Recovered </div>
                <div className="sortIcon">
                  {stateSortObject.activeSorting === "recovered"
                    ? SortIcon(stateSortObject.currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { handleSortClick("deaths"); sendEventToGA(category, action, "deaths") }}>
              <div className="heading">
                <div>Deaths </div>{" "}
                <div className="sortIcon">
                  {stateSortObject.activeSorting === "deaths" ? SortIcon(stateSortObject.currentOrder) : null}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {stateSortObject.states.map((stateCode, index) => {
            return (
              <StateWiseRow
                state={statewise[stateCode]}
                districts={districts[stateCode]}
                index={index + 1}
                key={stateCode}
                showNotificationModal={() => setShowModal(true)}
              ></StateWiseRow>
            );
          })}
        </tbody>
      </table>
      {showModal && <Modal>
        <div className="modal text-center">
          {modalContent}
          <div className="modal-button-wrapper">
            {showGetNotificationButtons && <button className="btn" onClick={getNotificationPermissions}>Okay</button>}
            <button className="btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      </Modal>}
    </div>
  );
};

export default StatewiseTable;
