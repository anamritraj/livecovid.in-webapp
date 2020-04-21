import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Charts.css";
import { useTranslation } from "react-i18next";

const colors = {
  Male: "#c2f0fc",
  Female: "#ffb0cd",
  "Details Awaited": "#959595"
};
const getColor = bar => {
  return colors[bar.id];
};

const GenderChart = ({ gender }) => {
  const {t} = useTranslation();
  let data = [];
  let totalCases = 0;
  Object.keys(gender).forEach(key => {
    let label = t("Male");
    if (key === "F") label = t("Female");
    if (key === "unknown") label = t("Details Awaited");
    totalCases += gender[key];
    data.push({
      id: label,
      label,
      value: gender[key]
    });
  });

  return (
    <div className="card chart">
      <div className="chart-controls">
        <h2>{t('Gender')}</h2>
      </div>

      <div style={{ height: "450px" }}>
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
