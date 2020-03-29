const { override, adjustWorkbox } = require("customize-cra");
const path = require("path");

module.exports = override(
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true
    })
  )
);
