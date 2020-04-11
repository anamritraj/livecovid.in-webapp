import React, { useState, useEffect } from "react";
import RowTableAccordion from "./RowTableAccordion";
import chevronRight from "./chevron-right.svg";
import { sendEventToGA } from '../../services/analytics.service'
const category = "User";
const action = "Clicked State Row"

const StateWiseRow = ({ state, districts }) => {
  const [isHidden, setIsHidden] = useState(true);
  return state.active > 0
    ? [
      <tr
        onClick={() => { setIsHidden(!isHidden); sendEventToGA(category, action, state.name) }}
        className={"state-row " + (isHidden ? "" : "open")}
        key={state.name}
      >
        <td className="expand-icon">
          <img src={chevronRight} alt="more-details" />
        </td>
        <td>{state.name}</td>
        <td>
          {state.confirmed}{" "}
          {state.delta.confirmed ? (
            <span className="delta confirmed">
              (+{state.delta.confirmed})
              </span>
          ) : (
              <span className="delta gray">(+0)</span>
            )}
        </td>
        <td>
          {state.recovered}{" "}
          {state.delta.recovered ? (
            <span className="delta recovered">
              (+{state.delta.recovered})
              </span>
          ) : (
              <span className="delta gray">(+0)</span>
            )}
        </td>
        <td>
          {state.deaths}{" "}
          {state.delta.deaths ? (
            <span className="delta deaths">(+{state.delta.deaths})</span>
          ) : (
              <span className="delta gray">(+0)</span>
            )}
        </td>
      </tr>,
        districts.districts ? (
          <RowTableAccordion
            lastUpdated={state.lastUpdated}
            districts={districts.districts}
            isHidden={isHidden}
            stateCode={state.code}
            key={state.code}
          ></RowTableAccordion>
        ) : null
      ]
    : null;
};

export default StateWiseRow;
