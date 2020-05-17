import React, { useEffect, useState, useMemo } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getStatesRaceChart } from '../../services/charts.service'
import useInterval from '../../hooks/useInterval'
import RaceChartControls from './RaceChartControls'
import { sendEventToGA } from '../../services/analytics.service'

const BarComponent = (props) => (
  <g transform={`translate(${props.x},${props.y})`}>
    <rect
      x={-3}
      y={7}
      width={props.width}
      height={props.height}
      fill="rgba(0, 0, 0, .07)"
    />
    <rect width={props.width} height={props.height} fill={props.color} />
    <rect
      x={props.width - 5}
      width={5}
      height={props.height}
      fill={props.borderColor}
      fillOpacity={0.2}
    />
    <text
      x={props.width - 16}
      y={props.height / 2 - 8}
      textAnchor="end"
      dominantBaseline="central"
      fill="black"
      style={{
        fontWeight: 900,
        fontSize: 15,
      }}
    >
      {props.data.indexValue}
    </text>
    <text
      x={props.width - 16}
      y={props.height / 2 + 10}
      textAnchor="end"
      dominantBaseline="central"
      fill={props.borderColor}
      style={{
        fontWeight: 400,
        fontSize: 13,
      }}
    >
      {props.data.value}
    </text>
  </g>
)

const MemoizedBarComponent = React.memo(BarComponent)

const DataManager = () => {
  let index = 0
  let dataStore = {}
  let state = []
  let totalElements = 0
  return {
    initialise: (intialIndex, data) => {
      index = intialIndex
      dataStore = data
      state = data[index]
      totalElements = data.length
    },
    restart: () => {
      index = 0
      state = dataStore[0]
    },
    increment: () => {
      if (index + 1 < totalElements) {
        index++
        state = dataStore[index]
      }
    },
    decrement: () => {
      if (index > 0) {
        index--
        state = dataStore[index]
      }
    },
    getData: () => ({
      index,
      state,
    }),
    isEnded: () => index + 1 === totalElements,
  }
}

const dataManager = DataManager()
// Analytics variables.
const category = 'User'
const action = 'Clicked Race Controls'

const darkTheme = {
  background: '#323232',
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
}

const RaceChart = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [raceTimeInterval, setRaceTimeInterval] = useState(2000)
  const [barData, setBarData] = useState({})
  const { t } = useTranslation()

  useEffect(() => {
    getStatesRaceChart().then((response) => {
      if (response.status === 200) {
        dataManager.initialise(0, response.data.raceChart)
        setBarData({
          data: [...dataManager.getData().state.data],
          date: dataManager.getData().state.date,
        })
      } else {
        console.log('Error in API')
      }
      setIsLoading(false)
    })
  }, [])

  useInterval(
    () => {
      dataManager.increment()
      setBarData({
        data: [...dataManager.getData().state.data],
        date: dataManager.getData().state.date,
      })
    },
    isPaused || isLoading || dataManager.isEnded() ? null : raceTimeInterval
  )

  const raceChartProps = useMemo(
    () => ({
      margin: {
        top: 26,
        right: props.isMobile ? 10 : 20,
        bottom: 26,
        left: props.isMobile ? 10 : 20,
      },
      keys: ['value'],
      borderColor: { from: 'color', modifiers: [['darker', 2.6]] },
      axisTop: {
        format: '~s',
      },
      axisBottom: {
        format: '~s',
      },
      labelTextColor: { from: 'color', modifiers: [['darker', 1.4]] },
    }),
    [props.isMobile]
  )

  const handlePauseClick = React.useCallback(() => {
    setIsPaused(!isPaused)
    sendEventToGA(category, action, 'pause/play')
  }, [isPaused])
  const handleFasterClick = React.useCallback(() => {
    setRaceTimeInterval(raceTimeInterval - raceTimeInterval * 0.25)
    sendEventToGA(category, action, 'faster')
  }, [raceTimeInterval])
  const handleSlowerClick = React.useCallback(() => {
    setRaceTimeInterval(raceTimeInterval + raceTimeInterval * 0.25)
    sendEventToGA(category, action, 'slower')
  }, [raceTimeInterval])
  const handleRestartClick = () => {
    setIsPaused(false)
    dataManager.restart()
    sendEventToGA(category, action, 'restart')
  }
  const handleForwardClick = React.useCallback(() => {
    setIsPaused(true)
    dataManager.increment()
    setBarData({
      data: [...dataManager.getData().state.data],
      date: dataManager.getData().state.date,
    })
    sendEventToGA(category, action, 'forward')
  }, [])
  const handleBackwardClick = React.useCallback(() => {
    setIsPaused(true)
    dataManager.decrement()
    setBarData({
      data: [...dataManager.getData().state.data],
      date: dataManager.getData().state.date,
    })
    sendEventToGA(category, action, 'backward')
  }, [])

  return isLoading ? (
    <div>{t('Loading')}</div>
  ) : (
    <div className="card race-chart">
      <h2>{t('State-wise Cases with Time')}</h2>
      <div>
        <h3 className="racechart-date">
          {format(new Date(barData.date), 'd MMMM yyyy')}
        </h3>
        <p className="racechart-speed">
          {t('Speed')}: {(2000 / raceTimeInterval).toPrecision(3)}x
        </p>
      </div>
      <div className="race-chart" style={{ height: '500px' }}>
        <ResponsiveBar
          layout="horizontal"
          margin={raceChartProps.margin}
          data={barData.data}
          indexBy="id"
          keys={raceChartProps.keys}
          colors={{ scheme: 'orange_red' }}
          colorBy="indexValue"
          borderColor={raceChartProps.borderColor}
          enableGridX
          enableGridY={false}
          axisTop={raceChartProps.axisTop}
          axisBottom={raceChartProps.axisBottom}
          axisLeft={null}
          padding={0.3}
          labelTextColor={raceChartProps.labelTextColor}
          isInteractive={false}
          barComponent={MemoizedBarComponent}
          motionStiffness={250}
          motionDamping={50}
          animate
          theme={props.isDarkTheme ? darkTheme : null}
        />
      </div>
      <RaceChartControls
        isPaused={isPaused}
        onPause={handlePauseClick}
        onFaster={handleFasterClick}
        onSlower={handleSlowerClick}
        onRestart={handleRestartClick}
        onStepForward={handleForwardClick}
        onStepBackward={handleBackwardClick}
      />
    </div>
  )
}

export default React.memo(RaceChart)
