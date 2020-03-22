import React from "react";
import "./nav.css";
const DrawerToggleButton = props => (
  <button className="toggle-button" onClick={props.click}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-menu-toggle"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
    >
      <path class="line line-1" d="M5 13h90v14H5z" />
      <path class="line line-2" d="M5 43h90v14H5z" />
      <path class="line line-3" d="M5 73h90v14H5z" />
    </svg>
  </button>
);

export default DrawerToggleButton;
