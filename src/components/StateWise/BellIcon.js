import React from "react";
import { sendEventToGA } from '../../services/analytics.service'
import BellIconSVG from "./BellIconSvg";

const BellIcon = ({ isBellActive, districtName, stateCode, handleBellClick }) => {
  return isBellActive !== null && (
    <BellIconSVG
      isBellActive={isBellActive}
      onClick={() => {
        handleBellClick(stateCode, districtName, !isBellActive);
        sendEventToGA("User", "Clicked Bell", isBellActive ? "on" : "off");
      }}
    ></BellIconSVG>
  );
};

export default BellIcon;
