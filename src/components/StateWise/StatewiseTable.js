import React from "react";
import { Link } from "react-router-dom";
import StateWiseRow from "./StateWiseRow";

const StatewiseTable = ({ statewise, isMobile }) => {
  return (
    <div>
      <table className="statewise-cases table card">
        <thead>
          <tr>
            {isMobile ? null : <td>SNo</td>}
            <td>State</td>
            <td>Confirmed</td>
            <td>Recovered</td>
            <td>Deaths</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(statewise).map((stateCode, index) => {
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
