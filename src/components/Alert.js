import React from "react";

const Alert = ({ show, content}) => {
  return <div className={"alert " + (show ? '' : 'hide')}>
    {content}
  </div>;
};

export default Alert;
