import React from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

const zoneClassMap = {
  R: 'Red',
  G: 'Green',
  O: 'Orange',
}

const IndiaMapInfo = ({ date, mapInfo, showInstruction }) => {
  const { t } = useTranslation()
  return (
    <div className="india-map-info">
      <div className="state-name">
        {/* TODO: Remove this hack and just name total key as India */}
        {mapInfo.name === 'Total' ? 'India' : mapInfo.name}
      </div>
      {mapInfo.zone && (
        <div className={`india-map-zone ${zoneClassMap[mapInfo.zone]}`}>
          {zoneClassMap[mapInfo.zone]}
        </div>
      )}
      <div className="india-map-date">{format(new Date(date), 'd MMMM yyyy')}</div>
      {showInstruction && (
        <div className="instruction">
          {t('Click outside map to see country stats')}
        </div>
      )}
    </div>
  )
}

export default IndiaMapInfo
