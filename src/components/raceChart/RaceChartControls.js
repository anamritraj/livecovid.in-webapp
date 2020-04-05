import React from 'react';
import FastForward from './ff.svg';
import Restart from './restart.svg';
import Pause from './pause.svg';
import Play from './play.svg';

const RaceChartControls = (props) => {
  return <div className="race-chart-controls">
    <button className="chart-control-btn" onClick={props.onPause}>
      <img className="control-img" src={props.isPaused ? Play : Pause} alt="" />
      {props.isPaused ? "Play" : "Pause"}
    </button>
    <button className="chart-control-btn" onClick={props.onRestart}>
      <img className="control-img" src={Restart} alt="" />
      Restart
    </button>
    <button className="chart-control-btn" onClick={props.onSlower}>
      <img className="control-img" style={{ transform: 'rotateZ(180deg)' }} src={FastForward} alt="" />
      Slower
    </button>
    <button className="chart-control-btn" onClick={props.onFaster}>
      <img className="control-img" src={FastForward} alt="" />
      Faster
      </button>
    <span className="racechart-speed">Speed: {(2000 / props.raceTimeInterval).toPrecision(3)}x</span>
  </div>
}

export default RaceChartControls;