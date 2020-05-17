import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const IndianTimeSeriesDailyChart = ({
  timeseries,
  months,
  themeObject,
  toolTipStyle,
  isMobile,
}) => (
  <ResponsiveLine
    data={timeseries}
    enableSlices="x"
    sliceTooltip={({ slice }) => {
      const d = slice.points[0].data.x
      const year = d.getFullYear()
      const date = d.getDate()
      const month = d.getMonth()
      return (
        <div style={toolTipStyle}>
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                padding: '3px 0',
              }}
            >
              <strong style={{ color: point.color }}>{point.serieId}</strong> :
              {point.data.yFormatted}
            </div>
          ))}

          <strong>{`${date} ${months[month]} ,${year}`}</strong>
        </div>
      )
    }}
    margin={{
      top: 0,
      right: isMobile ? 15 : 40,
      bottom: 70,
      left: isMobile ? 45 : 60,
    }}
    xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      reverse: false,
    }}
    layers={[
      'grid',
      'markers',
      'axes',
      'crosshair',
      'lines',
      'points',
      'slices',
      'mesh',
      'legends',
    ]}
    enableGridX={false}
    gridYValues={5}
    lineWidth={2}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      format: '%b %d',
      tickRotation: isMobile ? 45 : 0,
    }}
    theme={themeObject}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
    }}
    enablePoints={false}
    useMesh
    colors={['red', 'green', '#178fa7']}
    animate
    motionStiffness={90}
    motionDamping={15}
  />
)

export default IndianTimeSeriesDailyChart
