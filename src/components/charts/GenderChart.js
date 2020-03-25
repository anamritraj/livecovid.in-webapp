import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Charts.css";

const colors = { M: "#7ebcff", F: "#f77eb9", unknown: "#959595" };
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
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          colors={getColor}
          borderWidth={0}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
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
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default GenderChart;
