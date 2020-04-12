import React from "react";
import { ResponsiveLine } from "@nivo/line";

const IndianTimeSeriesDailyChart = ({
  timeseries,
  isLoading,
  months,
  isMobile
}) => {
  return (
    <ResponsiveLine
      data={timeseries}
      enableSlices={"x"}
      sliceTooltip={({ slice }) => {
        const d = slice.points[0].data.x;
        const year = d.getFullYear();
        const date = d.getDate();
        const month = d.getMonth();
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc"
            }}
          >
            {slice.points.map(point => (
              <div
                key={point.id}
                style={{
                  padding: "3px 0"
                }}
              >
                <strong>{point.serieId}</strong> : {point.data.yFormatted}
              </div>
            ))}

            <strong>{date + " " + months[month] + " ," + year}</strong>
          </div>
        );
      }}
      margin={{
        top: 0,
        right: isMobile ? 10 : 40,
        bottom: 70,
        left: isMobile ? 30 : 60
      }}
      xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false
      }}
      layers={[
        "grid",
        "markers",
        "axes",
        "crosshair",
        "lines",
        "points",
        "slices",
        "mesh",
        "legends"
      ]}
      enableGridX={false}
      gridYValues={5}
      lineWidth={2}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        format: "%b %d",
        tickRotation: isMobile ? 45 : 0
      }}
      theme={{ fontSize: isMobile ? 12 : 16 }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5
      }}
      enablePoints={false}
      useMesh={true}
      colors={["red", "green", "#178fa7"]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default IndianTimeSeriesDailyChart;
