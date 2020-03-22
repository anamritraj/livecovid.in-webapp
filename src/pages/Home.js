import React from "react";

import Stats from "../components/Stats";
import IndiaStateMap from "../components/IndiaStateMap";
const Home = props => {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>COVID-19 India Tracker Statewise</h1>
        </div>
        <Stats dayChange={props.dayChange} total={props.total}></Stats>
        {props.isLoading ? null : (
          <IndiaStateMap
            dayChange={props.dayChange}
            total={props.total}
            statewise={props.statewise}
            isMobile={props.isMobile}
          ></IndiaStateMap>
        )}
      </div>
    </>
  );
};

export default Home;
