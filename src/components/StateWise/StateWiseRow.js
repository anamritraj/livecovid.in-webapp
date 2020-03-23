import React from "react";

const StateWiseRow = ({ state, index, isMobile }) => {
  return state.active > 0 ? (
    <tr>
      {isMobile ? null : <td>{index}</td>}
      <td>{state.name}</td>
      <td>{state.confirmed}</td>
      <td>{state.recovered}</td>
      <td>{state.deaths}</td>
    </tr>
  ) : null;
};

export default StateWiseRow;
