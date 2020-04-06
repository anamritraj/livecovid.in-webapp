import React, { useState, useEffect } from "react";
import IndiaTimeSeriesCumulativeChart from "./IndiaTimeSeriesCumulativeChart";

import { getIndiaTimeSeries } from "../../../services/charts.service";
import "../Charts.css";
import IndianTimeSeriesDailyChart from "./IndianTimeSeriesDailyChart";
import { sendEventToGA } from '../../../services/analytics.service';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const category = "User";
const action = "Clicked daily/cumulative";
const cumulative = "cumulative";
const daily = "daily";

const IndianTimeSeriesWrapper = props => {
  const [dailyIndiaTimeSeriesData, setdailyIndiaTimeSeriesData] = useState([]);
  const [totalIndiaTimeSeriesData, settotalIndiaTimeSeriesData] = useState([]);
  const [chartToshow, setChartToshow] = useState(cumulative);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getIndiaTimeSeries()
      .then(response => {
        if (response.status == 200) {
          const chartData = {
            dailydeceased: {
              id: "Daily Deceased",
              color: "hsl(225, 70%, 50%)",
              data: []
            },
            dailyrecovered: {
              id: "Daily Recovered",
              color: "hsl(225, 70%, 50%)",
              data: []
            },
            dailyconfirmed: {
              id: "Daily Confirmed",
              color: "hsl(225, 70%, 50%)",
              data: []
            },
            totaldeceased: {
              id: "Total Deceased",
              color: "hsl(225, 70%, 50%)",
              data: []
            },
            totalrecovered: {
              id: "Total Recovered",
              color: "hsl(225, 70%, 50%)",
              data: []
            },
            totalconfirmed: {
              id: "Total Confirmed",
              color: "hsl(225, 70%, 50%)",
              data: []
            }
          };
          response.data.forEach((value, index) => {
            Object.keys(value).forEach(key => {
              if (key !== "date") {
                chartData[key].data.push({
                  x: value.date,
                  y: value[key]
                });
              }
            });
          });
          const totalChartData = [];
          const dailyChartData = [];

          Object.keys(chartData).forEach(key => {
            if (key.startsWith("total")) {
              totalChartData.push(chartData[key]);
            } else if (key.startsWith(daily)) {
              dailyChartData.push(chartData[key]);
            }
          });
          setdailyIndiaTimeSeriesData(dailyChartData);
          settotalIndiaTimeSeriesData(totalChartData);
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="card chart">
        <div className="chart-controls">
          <h2>Number of cases</h2>
          <button
            className={
              "btn btn-chart" + (chartToshow === cumulative ? " active" : "")
            }
            onClick={() => { setChartToshow(cumulative); sendEventToGA(category, action, cumulative) }}
          >
            Cumulative
          </button>
          <button
            className={
              "btn btn-chart" + (chartToshow === daily ? " active" : "")
            }
            onClick={() => { setChartToshow(daily); sendEventToGA(category, action, daily) }}
          >
            Daily
          </button>
        </div>

        <div style={{ height: "500px" }}>
          {chartToshow === daily && dailyIndiaTimeSeriesData.length ? (
            <IndianTimeSeriesDailyChart
              timeseries={dailyIndiaTimeSeriesData}
              isLoading={isLoading}
              months={months}
              isMobile={props.isMobile}
            ></IndianTimeSeriesDailyChart>
          ) : totalIndiaTimeSeriesData.length ? (
            <IndiaTimeSeriesCumulativeChart
              timeseries={totalIndiaTimeSeriesData}
              isLoading={isLoading}
              isMobile={props.isMobile}
              months={months}
            ></IndiaTimeSeriesCumulativeChart>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IndianTimeSeriesWrapper;
