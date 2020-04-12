import React, { useState, useEffect } from "react";
import SortIcon from "./SortIcon";
import { formatDistance, format } from "date-fns";
import BellIcon from "./BellIcon";

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

const RowTableAccordion = ({ districts, isHidden, lastUpdated, stateCode, showNotificationModal }) => {
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
  return (
    <tr className={"fold" + (isHidden ? " close" : "")}>
      <td colSpan="5">
        <div className="districts-table">
          <div className="last-updated-state">
            {" "}
            Updated {formatDistance(time, new Date())} ago at{" "}
            {format(time, "dd MMM yyyy HH:mm")}
          </div>
          <table>
            <thead>
              <tr>
                <th>District</th>
                <th
                  onClick={() => {
                    handleSorting("confirmed");
                  }}
                >
                  <div className="title">Confirmed</div>
                  {activeSortingKey === "confirmed"
                    ? SortIcon(currentOrder)
                    : null}
                </th>
                {/* <th></th> */}
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
                    {/* <td>
                      <BellIcon
                        districtName={districtName}
                        stateCode={stateCode}
                        showNotificationModal={showNotificationModal}
                      ></BellIcon>
                    </td> */}
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

export default RowTableAccordion;
