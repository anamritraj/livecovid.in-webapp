import React from 'react'

const Alert = ({ show, content }) => (
  <div className={`alert ${show ? '' : 'hide'}`}>{content}</div>
)

export default Alert
