import React from 'react'

const SortIcon = (currentOrder) => (
  <svg
    style={{
      padding: '0 5px',
      transform: currentOrder < 0 ? 'rotateZ(180deg)' : null,
    }}
    version="1.1"
    x="0px"
    y="0px"
    width="10px"
    height="10px"
    viewBox="0 0 255 255"
  >
    <polygon points="0,63.75 127.5,191.25 255,63.75" />
  </svg>
)

export default SortIcon
