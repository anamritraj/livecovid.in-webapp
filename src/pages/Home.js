import React from "react";

import Stats from "../components/Stats";
import IndiaStateMap from "../components/IndiaStateMap";
const Home = props => {
  return (
    <>
      <div className="container">
        <Stats dayChange={props.dayChange} total={props.total}></Stats>
        <div className="row">
          <h1>COVID-19 Cases India - State-wise</h1>
        </div>
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
