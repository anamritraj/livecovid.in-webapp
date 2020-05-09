import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import IndiaTimeSeriesCumulativeChart from './IndiaTimeSeriesCumulativeChart';

import { getIndiaTimeSeries } from '../../../services/charts.service';
import '../Charts.css';
import IndianTimeSeriesDailyChart from './IndianTimeSeriesDailyChart';
import { sendEventToGA } from '../../../services/analytics.service';

const category = 'User';
const action = 'Clicked daily/cumulative';
const cumulative = 'cumulative';
const daily = 'daily';

const getWindowTimeSeriesData = (data) => {
  data.forEach((fields) => {
    fields.data = fields.data.slice(fields.data.length - 30, fields.data.length);
  });
  return data;
};

const darkTheme = {
  background: '#323232',
  tooltip: {
    container: {
      background: '#000',
    },
  },
  axis: {
    domain: {
      line: {
        stroke: '#526271',
      },
    },
    ticks: {
      line: {
        stroke: '#526271',
        strokeWidth: 1,
      },
      text: {
        fill: '#8d9cab',
        fontSize: 11,
      },
    },
  },
  grid: {
    line: {
      stroke: '#444',
    },
  },
  crosshair: {
    line: {
      stroke: '#fff',
    },
  },
};

const IndianTimeSeriesWrapper = (props) => {
  const [dailyIndiaTimeSeriesData, setdailyIndiaTimeSeriesData] = useState([]);
  const [totalIndiaTimeSeriesData, settotalIndiaTimeSeriesData] = useState([]);
  const [chartToshow, setChartToshow] = useState(cumulative);
  const [isLoading, setIsLoading] = useState(true);
  const [toolTipStyle, setToolTipStyle] = useState({
    background: 'white',
    padding: '9px 12px',
    border: '1px solid #ccc',
  });
  const { t } = useTranslation();
  const memoizedMonths = useMemo(() => [
    t('months:January'),
    t('months:February'),
    t('months:March'),
    t('months:April'),
    t('months:May'),
    t('months:June'),
    t('months:July'),
    t('months:August'),
    t('months:September'),
    t('months:October'),
    t('months:November'),
    t('months:December'),
  ], [t]);

  useEffect(() => {
    setToolTipStyle({
      background: '#191919',
      padding: '9px 12px',
      border: '1px solid #ccc',
      color: '#dadada',
    });
  }, [props.theme]);

  useEffect(() => {
    getIndiaTimeSeries()
      .then((response) => {
        if (response.status === 200) {
          const chartData = {
            dailydeceased: {
              id: t('Daily Deceased'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
            dailyrecovered: {
              id: t('Daily Recovered'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
            dailyconfirmed: {
              id: t('Daily Confirmed'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
            totaldeceased: {
              id: t('Total Deceased'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
            totalrecovered: {
              id: t('Total Recovered'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
            totalconfirmed: {
              id: t('Total Confirmed'),
              color: 'hsl(225, 70%, 50%)',
              data: [],
            },
          };
          response.data.forEach((value, index) => {
            Object.keys(value).forEach((key) => {
              if (key !== 'date') {
                chartData[key].data.push({
                  x: value.date,
                  y: value[key],
                });
              }
            });
          });
          const totalChartData = [];
          const dailyChartData = [];

          Object.keys(chartData).forEach((key) => {
            if (key.startsWith('total')) {
              totalChartData.push(chartData[key]);
            } else if (key.startsWith(daily)) {
              dailyChartData.push(chartData[key]);
            }
          });
          const dailyChartDataSliced = getWindowTimeSeriesData(dailyChartData);
          const totalChartDataSliced = getWindowTimeSeriesData(totalChartData);
          setdailyIndiaTimeSeriesData(dailyChartDataSliced);
          settotalIndiaTimeSeriesData(totalChartDataSliced);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (!isLoading && (
  <div>
    <div className="card chart">
      <div className="chart-controls">
        <h2>{t('Number of cases')}</h2>
        <button
          className={
              `btn btn-chart${chartToshow === cumulative ? ' active' : ''}`
            }
          onClick={() => { setChartToshow(cumulative); sendEventToGA(category, action, cumulative); }}
        >
          {t('Cumulative')}
        </button>
        <button
          className={
              `btn btn-chart${chartToshow === daily ? ' active' : ''}`
            }
          onClick={() => { setChartToshow(daily); sendEventToGA(category, action, daily); }}
        >
          {t('Daily')}
        </button>
      </div>

      <div style={{ height: '500px' }}>
        {chartToshow === daily && dailyIndiaTimeSeriesData.length ? (
          <IndianTimeSeriesDailyChart
            timeseries={dailyIndiaTimeSeriesData}
            months={memoizedMonths}
            themeObject={props.theme === 'dark' ? darkTheme : null}
            isMobile={props.isMobile}
            toolTipStyle={toolTipStyle}
          />
        ) : totalIndiaTimeSeriesData.length ? (
          <IndiaTimeSeriesCumulativeChart
            timeseries={totalIndiaTimeSeriesData}
            themeObject={props.theme === 'dark' ? darkTheme : null}
            isMobile={props.isMobile}
            months={memoizedMonths}
            toolTipStyle={toolTipStyle}
          />
        ) : null}
      </div>
    </div>
  </div>
  )
  );
};

export default IndianTimeSeriesWrapper;
