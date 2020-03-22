import React from "react";

const India = () => {
  return (
    <div
      className="popover"
      style={{
        display: popover.show ? "block" : "none",
        top: popover.y,
        left: popover.x
      }}
    >
      popover
      {name}
      <br></br>
      {count}
    </div>
  );
};

export default India;
