import React from "react";

const Popover = ({ name, count, popover }) => {
  return (
    <div
      className="popover card"
      style={{
        display: popover.show ? "block" : "none",
        top: popover.y,
        left: popover.x
      }}
    >
      {name}
      <br></br>
      {count}
    </div>
  );
};

export default Popover;
