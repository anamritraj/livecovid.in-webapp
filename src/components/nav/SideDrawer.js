import React from "react";
import { Link } from "react-router-dom";

import "./nav.css";

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <div onClick={props.click}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          className="close-svg"
          enableBackground="new 0 0 40 40"
          version="1.1"
          stroke="#000"
        >
          <line
            x1="15"
            y1="15"
            x2="25"
            y2="25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeMiterlimit="10"
          ></line>
          <line
            x1="25"
            y1="15"
            x2="15"
            y2="25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeMiterlimit="10"
          ></line>
        </svg>
      </div>
      <ul>
        <li>
          <Link to="/" onClick={props.click}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/help" onClick={props.click}>
            Help
          </Link>
        </li>
        <li>
          <Link to="credits" onClick={props.click}>
            Credits
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
