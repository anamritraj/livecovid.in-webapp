import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Charts.css";

const colors = { M: "#c2f0fc", F: "#ffb0cd", unknown: "#959595" };
const getColor = bar => {
  return colors[bar.id];
};

let totalCases = 0;

const GenderChart = ({ gender }) => {
  let data = [];
  Object.keys(gender).map(key => {
    let label = "Male";
    if (key === "F") label = "Female";
    if (key === "unknown") label = "Unknown";
    totalCases += gender[key];
    data.push({
      id: key,
      label,
      value: gender[key]
    });
  });

  return (
    <div className="card chart">
      <h2>Gender</h2>
      <div style={{ height: "500px" }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          colors={getColor}
          borderWidth={0}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={5}
          radialLabelsLinkHorizontalLength={5}
          radialLabelsLinkStrokeWidth={1}
          animate={true}
          tooltip={({ label, value }) => {
            return (
              <div>
                {label} : {value} Cases <br></br>{" "}
                {((value / totalCases) * 100).toPrecision(4)}%
              </div>
            );
          }}
          theme={{ fontSize: 16 }}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default GenderChart;
