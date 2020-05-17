import React from 'react'

import Stats from '../components/Stats'
import IndiaStateMap from '../components/IndiaStateMap/IndiaStateMap'
import GenderChart from '../components/charts/GenderChart'
import IndianTimeSeriesWrapper from '../components/charts/timeSeriesCharts/IndianTimeSeriesWrapper'
import { HelmetDefault } from '../components/SEO'
import LastUpdatedIndicator from '../components/LastUpdatedIndicator'
import RaceChart from '../components/raceChart/RaceChart'
import StatewiseTable from '../components/StateWise/StatewiseTable'
import IndiaDistrictWiseZones from '../components/IndiaDistrictWiseZones/IndiaDistrictWiseZones'

const Home = (props) => (
  <>
    <HelmetDefault title="Home" />
    <div className="container">
      <LastUpdatedIndicator lastUpdated={props.total.lastUpdated} />
      <Stats dayChange={props.dayChange} total={props.total} tested={props.tested} />
      <div className="grid">
        <div className="grid-child india-state-wrapper">
          {props.isLoading ? null : (
            <IndiaStateMap
              dayChange={props.dayChange}
              total={props.total}
              theme={props.theme}
              statewise={props.statewise}
              isMobile={props.isMobile}
            />
          )}
        </div>
        <div className="grid-child state-wise-wrapper">
          <StatewiseTable
            theme={props.theme}
            statewise={props.statewise}
            isMobile={props.isMobile}
            statewiseTestingData={props.statewiseTestingData}
          />
        </div>
        <div className="grid-child zone-wrapper">
          {props.isLoading ? null : <IndiaDistrictWiseZones theme={props.theme} />}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <RaceChart
            isMobile={props.isMobile}
            isDarkTheme={props.theme === 'dark'}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <IndianTimeSeriesWrapper theme={props.theme} isMobile={props.isMobile} />
        </div>
      </div>
      <div className="grid">
        <GenderChart gender={props.gender} theme={props.theme} />
      </div>
    </div>
  </>
)

export default Home
