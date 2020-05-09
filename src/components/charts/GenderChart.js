import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import './Charts.css';
import { useTranslation } from 'react-i18next';

const darkModeColors = {
  Male: '#2c769d',
  Female: '#be245d',
  'Details Awaited': '#4f4d4d',
};
const lightModeColors = {
  Male: '#c2f0fc',
  Female: '#ffb0cd',
  'Details Awaited': '#959595',
};
const getColor = (colors, bar) => colors[bar.id];

const lightThemeObject = {
  tooltip: {
    container: {
      background: '#000',
    },
  },
};

const darkThemeObject = {
  background: '#323232',
  tooltip: {
    container: {
      background: '#000',
    },
  },
  labels: {
    text: {
      fill: '#e4e4e4',
    },
  },
};

const GenderChart = ({ gender, theme }) => {
  const { t } = useTranslation();
  const data = [];
  let totalCases = 0;
  const [colors, setColors] = useState(lightModeColors);
  useEffect(() => {
    setColors((theme === 'dark') ? darkModeColors : lightModeColors);
  }, [theme]);

  Object.keys(gender).forEach((key) => {
    let label = t('Male');
    if (key === 'F') label = t('Female');
    if (key === 'unknown') label = t('Details Awaited');
    totalCases += gender[key];
    data.push({
      id: label,
      label,
      value: gender[key],
    });
  });

  return (
    <div className="card chart">
      <div className="chart-controls">
        <h2>{t('Gender')}</h2>
      </div>

      <div style={{ height: '450px' }}>
        <ResponsivePie
          data={data}
          margin={{
            top: 40, right: 40, bottom: 40, left: 40,
          }}
          colors={(bar) => getColor(colors, bar)}
          borderWidth={0}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={5}
          radialLabelsLinkHorizontalLength={5}
          radialLabelsLinkStrokeWidth={1}
          animate
          tooltip={({ label, value }) => (
            <div style={{ color: '#e4e4e4' }}>
              {label}
              {' '}
              :
              {value}
              {' '}
              Cases
              <br />
              {' '}
              {((value / totalCases) * 100).toPrecision(4)}
              %
            </div>
          )}
          theme={theme === 'dark' ? darkThemeObject : lightThemeObject}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default GenderChart;
