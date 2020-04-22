import React, { useState, useEffect } from "react";
import SortIcon from "./SortIcon";
import { formatDistance, format } from "date-fns";
import BellIcon from "./BellIcon";
import { useTranslation } from "react-i18next";

const sortDistricts = (districtArray, currentOrder, activeSortingKey) => {
  return Object.keys(districtArray).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return (
      currentOrder *
      (parseInt(districtArray[b][activeSortingKey]) -
        parseInt(districtArray[a][activeSortingKey]))
    );
  });
};

const RowTableAccordion = ({ districts, isHidden, lastUpdated, stateCode, handleBellClick, allNotificationsEnabled, statesNotificationStatus }) => {
  const districtKeysArray = Object.keys(districts)
  const [districtSortOrder, setDistrictSortOrder] = useState(districtKeysArray);
  const [activeSortingKey, setActiveSortingKey] = useState("confirmed");
  const [currentOrder, setCurrentOrder] = useState(1);

  const handleSorting = newActiveSortingKey => {
    let newCurrentOrder = 1;
    if (newActiveSortingKey === activeSortingKey) {
      newCurrentOrder = currentOrder * -1;
    }
    setDistrictSortOrder(
      sortDistricts(districts, currentOrder, newActiveSortingKey)
    );
    setActiveSortingKey(newActiveSortingKey);
    setCurrentOrder(newCurrentOrder);
  };

  useEffect(() => {
    handleSorting("confirmed");
  }, []);
  const time = new Date(Date.parse(lastUpdated.slice(0, 19) + "+05:30"));
  const { t } = useTranslation();
  return !isHidden && (
    <tr className="fold">
      <td colSpan="5">
        <div className="districts-table">
          <div className="state-desc-header">
            <div className="last-updated-state">
              {" "}
              {t('Updated')} {formatDistance(time, new Date())} {t('ago at')}{" "}
              {format(time, "dd MMM yyyy HH:mm")}
            </div>
            <BellIcon
              stateCode={stateCode}
              districtName="all"
              handleBellClick={handleBellClick}
              isBellActive={allNotificationsEnabled || (statesNotificationStatus && statesNotificationStatus['all'] === true) || false}
              isDisabled={allNotificationsEnabled}
            ></BellIcon>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>{t('District')}</th>
                <th
                  onClick={() => {
                    handleSorting("confirmed");
                  }}
                >
                  <div className="title">{t('Confirmed')}</div>
                  {activeSortingKey === "confirmed"
                    ? SortIcon(currentOrder)
                    : null}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {districtSortOrder.map(districtName => {
                return (
                  <tr key={districtName}>
                    <td>{districtName}</td>
                    <td>
                      {districts[districtName].confirmed}{" "}
                      {districts[districtName].delta.confirmed ? (
                        <span className="delta confirmed">
                          (+{districts[districtName].delta.confirmed})
                        </span>
                      ) : (
                          <span className="delta gray">(+0)</span>
                        )}</td>
                    <td>
                      <BellIcon
                        districtName={districtName}
                        stateCode={stateCode}
                        isBellActive={allNotificationsEnabled ||
                          (statesNotificationStatus && statesNotificationStatus['all'] === true) ||
                          (statesNotificationStatus && statesNotificationStatus[districtName]) ||
                          false
                        }
                        isDisabled={allNotificationsEnabled ||
                          (statesNotificationStatus && statesNotificationStatus['all'] === true)}
                        handleBellClick={handleBellClick}
                      ></BellIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(RowTableAccordion);
