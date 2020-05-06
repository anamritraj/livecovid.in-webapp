import React from "react";

import Stats from "../components/Stats";
import IndiaStateMap from "../components/IndiaStateMap/IndiaStateMap";
import GenderChart from "../components/charts/GenderChart";
import IndianTimeSeriesWrapper from "../components/charts/timeSeriesCharts/IndianTimeSeriesWrapper";
import { HelmetDefault } from "../components/SEO";
import LastUpdatedIndicator from "../components/LastUpdatedIndicator";
import RaceChart from "../components/raceChart/RaceChart";
import StatewiseTable from "../components/StateWise/StatewiseTable";
import IndiaDistrictWiseZones from "../components/IndiaDistrictWiseZones/IndiaDistrictWiseZones";

const Home = props => {
return <>
        <HelmetDefault title={"Home"}></HelmetDefault>
        <div className="container">
          <LastUpdatedIndicator
            lastUpdated={props.total.lastUpdated}
          ></LastUpdatedIndicator>
          <Stats
            dayChange={props.dayChange}
            total={props.total}
            tested={props.tested}
          ></Stats>
          <div className="grid">
            <div className="grid-child india-state-wrapper">
              {props.isLoading ? null : <IndiaStateMap
                dayChange={props.dayChange}
                total={props.total}
                theme={props.theme}
                statewise={props.statewise}
                isMobile={props.isMobile}
              ></IndiaStateMap>}
            </div>
            <div className="grid-child state-wise-wrapper">
              <StatewiseTable
                theme={props.theme}
                statewise={props.statewise}
                isMobile={props.isMobile}
                statewiseTestingData={props.statewiseTestingData}
              ></StatewiseTable>
            </div>
            <div className="grid-child zone-wrapper">
              {props.isLoading ? null : <IndiaDistrictWiseZones
                theme={props.theme}
              />}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RaceChart isMobile={props.isMobile} isDarkTheme={props.theme === 'dark'}></RaceChart>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <IndianTimeSeriesWrapper
                theme={props.theme}
                isMobile={props.isMobile}
              ></IndianTimeSeriesWrapper>
            </div>
            {/* <div className="col-6">
              <AgeGroup ageGroup={props.ageGroup}></AgeGroup>
            </div> */}
            <div className="col-6">
              <GenderChart 
                gender={props.gender}
                theme={props.theme}
              ></GenderChart>
            </div>
            {/* <div className="col-6">
            <NationalityChart
              nationality={props.nationality}
            ></NationalityChart>
          </div> */}
          </div>
        </div>
      </>
};

export default Home;
