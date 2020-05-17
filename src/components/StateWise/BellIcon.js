import React from 'react'
import { sendEventToGA } from '../../services/analytics.service'
import BellIconSVG from './BellIconSvg'

const BellIcon = ({
  isBellActive,
  districtName,
  stateCode,
  handleBellClick,
  isDisabled,
}) =>
  isBellActive !== null && (
    <BellIconSVG
      isBellActive={isBellActive}
      isDisabled={isDisabled}
      onClick={() => {
        if (!isDisabled) {
          handleBellClick(stateCode, districtName, !isBellActive)
          sendEventToGA('User', 'Clicked Bell', isBellActive ? 'on' : 'off')
        }
      }}
    />
  )

export default React.memo(BellIcon)
