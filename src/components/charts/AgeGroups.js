import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import "./Charts.css";

const AgeGroup = props => {
  const ageGroup = props.ageGroup;
  let data = [];
  Object.keys(ageGroup).map(key => {
    data.push({
      ageGroup: key,
      value: ageGroup[key]
    });
  });

  return (
    <div className="card chart">
      <div className="chart-controls">
        <h2>Age Groups</h2>
      </div>

      <div style={{ height: "450px" }}>
        <ResponsiveBar
          data={data}
          keys={["value"]}
          indexBy="ageGroup"
          margin={{ top: 50, right: 0, bottom: 50, left: 45 }}
          padding={0.3}
          colorBy="index"
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Age Group",
            legendPosition: "middle",
            legendOffset: 42
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendPosition: "middle",
            legendOffset: -40
          }}
          theme={{ fontSize: "12px" }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableGridY={false}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          tooltip={({ data }) => {
            return (
              <div>
                <span>Age Group: {data.ageGroup}</span>
                <br></br>
                <span>Cases: {data.value}</span>
              </div>
            );
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default AgeGroup;
