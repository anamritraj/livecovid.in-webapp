import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StateWiseRow from "./StateWiseRow";

const getSortedElement = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="sorted-svg"
    >
      <polyline points="15 3 21 3 21 9"></polyline>
      <polyline points="9 21 3 21 3 15"></polyline>
      <line x1="21" y1="3" x2="14" y2="10"></line>
      <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
  );
};

const StatewiseTable = ({ statewise, isMobile }) => {
  const [states, setStates] = useState(Object.keys(statewise));
  const [activeSorting, setActiveSorting] = useState("");
  const [currentOrder, setCurrentOrder] = useState(1);
  // For the intial sorting when it renders the first time, empty array as second parameters ensures this effect is run one time.
  useEffect(() => {
    sortStates("confirmed");
  }, []);
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

  return (
    <div>
      <table className="statewise-cases table card">
        <thead>
          <tr>
            {isMobile ? null : <th>SNo</th>}
            <th>State</th>
            <th onClick={e => sortStates("confirmed")}>
              <div className="heading">
                <div>Confirmed</div>
                {activeSorting === "confirmed" ? getSortedElement() : null}
              </div>
            </th>
            <th onClick={e => sortStates("recovered")}>
              <div className="heading">
                <div>Recovered </div>
                {activeSorting === "recovered" ? getSortedElement() : null}
              </div>
            </th>
            <th onClick={e => sortStates("deaths")}>
              <div className="heading">
                <div>Deaths </div>{" "}
                {activeSorting === "deaths" ? getSortedElement() : null}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {states.map((stateCode, index) => {
            return (
              <StateWiseRow
                state={statewise[stateCode]}
                index={index + 1}
                key={stateCode}
                isMobile={isMobile}
              ></StateWiseRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatewiseTable;
