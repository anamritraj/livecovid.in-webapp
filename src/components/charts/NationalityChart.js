import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import './Charts.css'

const colors = {
  Indian: '#8ac6d1',
  Foreign: '#ff7272',
  'Details Awaited': '#f1e7b6',
}

const getColor = (bar) => colors[bar.id]

let totalCases = 0

const NationalityChart = ({ nationality }) => {
  const data = []
  Object.keys(nationality).map((key) => {
    let label = 'Indian'
    if (key === 'foreign') label = 'Foreign'
    if (key === 'unknown') label = 'Details Awaited'
    totalCases += nationality[key]
    data.push({
      id: label,
      label,
      value: nationality[key],
    })
  })

  return (
    <div className="card chart">
      <div className="chart-controls">
        <h2>Nationality</h2>
      </div>

      <div style={{ height: '450px' }}>
        <ResponsivePie
          data={data}
          margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 60,
          }}
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
          animate
          tooltip={({ label, value }) => (
            <div>
              {label} :{value} Cases
              <br /> {((value / totalCases) * 100).toPrecision(4)}%
            </div>
          )}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  )
}

export default NationalityChart
