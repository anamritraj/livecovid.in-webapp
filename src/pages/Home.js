import React, { useEffect } from "react";

import Stats from "../components/Stats";
import IndiaStateMap from "../components/IndiaStateMap";
import AgeGroup from "../components/charts/AgeGroups";

const Home = props => {
  return (
    <>
      <div className="container">
        <Stats
          dayChange={props.dayChange}
          total={props.total}
          tested={props.tested}
        ></Stats>
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
        <div className="row">
          <div className="col-6">
            <AgeGroup ageGroup={props.ageGroup}></AgeGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
