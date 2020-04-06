import React, { useState, useEffect } from "react";
import StateWiseRow from "./StateWiseRow";
import { getDistrictWiseData } from "../../services/patients.service";
import SortIcon from "./SortIcon";
import { sendEventToGA } from '../../services/analytics.service'

const StatewiseTable = ({ statewise, isMobile }) => {
  const [states, setStates] = useState(Object.keys(statewise));
  const [districts, setDistricts] = useState(Object.keys({}));
  const [activeSorting, setActiveSorting] = useState("");
  const [currentOrder, setCurrentOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // For the intial sorting when it renders the first time, empty array as second parameters ensures this effect is run one time.
  useEffect(() => {
    sortStates("confirmed");
  }, []);

  useEffect(() => {
    getDistrictWiseData().then(response => {
      if (response.status === 200) {
        setDistricts(response.data);
      } else {
        console.log("Error in API");
      }
      setIsLoading(false);
    });
  }, []);

  const category = "User";
  const action = "Clicked Sorting";

  const sortStates = key => {
    let currentOrderNew = currentOrder;
    if (activeSorting === key) {
      currentOrderNew = currentOrderNew * -1;
    } else {
      currentOrderNew = 1;
    }
    let keys = Object.keys(statewise);
    keys.sort((a, b) => {
      return (
        currentOrderNew *
        (parseInt(statewise[b][key]) - parseInt(statewise[a][key]))
      );
    });
    setStates(keys);
    setActiveSorting(key);
    setCurrentOrder(currentOrderNew);
  };

  return isLoading ? null : (
    <div>
      <table className="statewise-cases table card">
        <thead>
          <tr>
            <th></th>
            <th>State</th>
            <th onClick={e => { sortStates("confirmed"); sendEventToGA(category, action, "confirmed") }}>
              <div className="heading">
                <div>Confirmed</div>
                <div className="sortIcon">
                  {activeSorting === "confirmed"
                    ? SortIcon(currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { sortStates("recovered"); sendEventToGA(category, action, "recovered") }}>
              <div className="heading">
                <div>Recovered </div>
                <div className="sortIcon">
                  {activeSorting === "recovered"
                    ? SortIcon(currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { sortStates("deaths"); sendEventToGA(category, action, "deaths") }}>
              <div className="heading">
                <div>Deaths </div>{" "}
                <div className="sortIcon">
                  {activeSorting === "deaths" ? SortIcon(currentOrder) : null}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {states.map((stateCode, index) => {
            return (
              <StateWiseRow
                state={statewise[stateCode]}
                districts={districts[stateCode]}
                index={index + 1}
                key={stateCode}
              ></StateWiseRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatewiseTable;
