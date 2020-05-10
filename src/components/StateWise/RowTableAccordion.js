/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SortIcon from './SortIcon';
import BellIcon from './BellIcon';
import StateWiseTestData from './StateWiseTestData';
import StateLastUpdate from './StateLastUpdate';

const sortDistricts = (districtArray, currentOrder, activeSortingKey) => Object.keys(districtArray).sort((a, b) => {
  if (a === 'Unknown') return 1;
  if (b === 'Unknown') return -1;
  return (
    currentOrder
      * (parseInt(districtArray[b][activeSortingKey])
        - parseInt(districtArray[a][activeSortingKey]))
  );
});

const RowTableAccordion = ({
  districts, isHidden, lastUpdated, stateCode, handleBellClick, allNotificationsEnabled, statesNotificationStatus, testingData,
}) => {
  const districtKeysArray = Object.keys(districts);
  const [districtSortOrder, setDistrictSortOrder] = useState(districtKeysArray);
  const [activeSortingKey, setActiveSortingKey] = useState('confirmed');
  const [currentOrder, setCurrentOrder] = useState(1);

  const handleSorting = (newActiveSortingKey) => {
    let newCurrentOrder = 1;
    if (newActiveSortingKey === activeSortingKey) {
      newCurrentOrder = currentOrder * -1;
    }
    setDistrictSortOrder(
      sortDistricts(districts, currentOrder, newActiveSortingKey),
    );
    setActiveSortingKey(newActiveSortingKey);
    setCurrentOrder(newCurrentOrder);
  };

  useEffect(() => {
    handleSorting('confirmed');
  }, []);

  const { t } = useTranslation();
  return !isHidden && (
    <tr className="fold">
      <td colSpan="6">
        <div className="districts-table">
          <StateLastUpdate
            testingData={testingData}
            time={new Date(Date.parse(`${lastUpdated.slice(0, 19)}+05:30`))}
            stateCode={stateCode}
            allNotificationsEnabled={allNotificationsEnabled}
            statesNotificationStatus={statesNotificationStatus}
            handleBellClick={handleBellClick}
          />
          <table>
            <thead>
              <tr>
                <th>{t('District')}</th>
                <th
                  className="clickable-header"
                  onClick={() => {
                    handleSorting('confirmed');
                  }}
                >
                  <div className="heading">
                    <div className="confirmed">{t('Cnfrm')}</div>
                    <div className="sortIcon">
                      {activeSortingKey === 'confirmed'
                        ? SortIcon(currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th
                  className="clickable-header"
                  onClick={() => {
                    handleSorting('active');
                  }}
                >
                  <div className="heading">
                    <div className="active">{t('Actv')}</div>
                    <div className="sortIcon">
                      {activeSortingKey === 'active'
                        ? SortIcon(currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th
                  className="clickable-header"
                  onClick={() => {
                    handleSorting('recovered');
                  }}
                >
                  <div className="heading">
                    <div className="recovered">{t('Rcvrd')}</div>
                    <div className="sortIcon">
                      {activeSortingKey === 'recovered'
                        ? SortIcon(currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th
                  className="clickable-header"
                  onClick={() => {
                    handleSorting('death');
                  }}
                >
                  <div className="heading">
                    <div className="deaths">{t('Deaths')}</div>
                    <div className="sortIcon">
                      {activeSortingKey === 'deceased'
                        ? SortIcon(currentOrder)
                        : null}
                    </div>
                  </div>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {districtSortOrder.map((districtName) => (
                <tr key={districtName}>
                  <td>{districtName}</td>
                  <td>
                    {districts[districtName].delta.confirmed ? (
                      <span className="delta confirmed">
                        +
                        {Number(districts[districtName].delta.confirmed).toLocaleString('en')}
                      </span>
                    ) : ('')}
                    {' '}
                    {Number(districts[districtName].confirmed).toLocaleString('en')}
                  </td>
                  <td>
                    {Number(districts[districtName].active).toLocaleString('en')}
                  </td>
                  <td>
                    {districts[districtName].delta.recovered ? (
                      <span className="delta recovered">
                        +
                        {Number(districts[districtName].delta.recovered).toLocaleString('en')}
                      </span>
                    ) : ('')}
                    {' '}
                    {Number(districts[districtName].recovered).toLocaleString('en')}
                  </td>
                  <td>
                    {districts[districtName].delta.deceased ? (
                      <span className="delta deceased">
                        +
                        {Number(districts[districtName].delta.deceased).toLocaleString('en')}
                      </span>
                    ) : ('')}
                    {' '}
                    {Number(districts[districtName].deceased).toLocaleString('en')}
                  </td>
                  <td>
                    <BellIcon
                      districtName={districtName}
                      stateCode={stateCode}
                      isBellActive={allNotificationsEnabled
                          || (statesNotificationStatus && statesNotificationStatus.all === true)
                          || (statesNotificationStatus && statesNotificationStatus[districtName])
                          || false}
                      isDisabled={allNotificationsEnabled
                          || (statesNotificationStatus && statesNotificationStatus.all === true)}
                      handleBellClick={handleBellClick}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(RowTableAccordion);
