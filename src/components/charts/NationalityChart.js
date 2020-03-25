import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Charts.css";

const colors = { indian: "#8ac6d1", foreign: "#ff7272", unknown: "#f1e7b6" };

const getColor = bar => {
  return colors[bar.id];
};

let totalCases = 0;

const NationalityChart = ({ nationality }) => {
  let data = [];
  Object.keys(nationality).map(key => {
    let label = "Indian";
    if (key === "foreign") label = "Foreign";
    if (key === "unknown") label = "Unknown";
    totalCases += nationality[key];
    data.push({
      id: key,
      label,
      value: nationality[key]
    });
  });

  return (
    <div className="card chart">
      <h2>Nationality</h2>
      <div style={{ height: "500px" }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 40, bottom: 40, left: 60 }}
          colors={getColor}
          startAngle={-45}
          borderWidth={0}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={0}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={5}
          radialLabelsLinkHorizontalLength={5}
          radialLabelsLinkStrokeWidth={2}
          theme={{ fontSize: 16 }}
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

export default NationalityChart;
