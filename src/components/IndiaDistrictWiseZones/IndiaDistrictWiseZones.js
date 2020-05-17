import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IndiaStateDistrictMapSVG from './IndiaStateDistrictMapSVG'
import IndiaMapInfo from '../IndiaStateMap/IndiaMapInfo'

const IndiaDistrictWiseZones = ({ theme }) => {
  const { t } = useTranslation()
  const [mapInfo, setMapInfo] = useState({ name: 'India', zone: '' })

  const handleDistrictHover = (e, zone) => {
    try {
      const districtName = e.target.id.split('_')[1]
      if (districtName) {
        setMapInfo({ name: districtName, zone })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="card chart chart-controls">
      <h2>{t('District-wise Zones status')}</h2>
      <div className="india-svg-map">
        <IndiaMapInfo date={new Date()} mapInfo={mapInfo} />
        <IndiaStateDistrictMapSVG
          handleDistrictHover={handleDistrictHover}
          theme={theme}
        />
      </div>
    </div>
  )
}

export default IndiaDistrictWiseZones
