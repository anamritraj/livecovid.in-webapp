import React from 'react';
import FastForward from './ff.svg';
import StepForward from './step-forward.svg'
import Restart from './restart.svg';
import Pause from './pause.svg';
import Play from './play.svg';

const RaceChartControls = (props) => {
  return <div className="race-chart-controls">
    <div className="button-controls">
      <button className="chart-control-btn" onClick={props.onPause}>
        <img className="control-img" src={props.isPaused ? Play : Pause} alt="play/pause button" />
        {props.isPaused ? "Play" : "Pause"}
      </button>
      <button className="chart-control-btn" onClick={props.onRestart}>
        <img className="control-img" src={Restart} alt="restart racechart" />
        Restart
    </button>
      <button className="chart-control-btn" onClick={props.onSlower}>
        <img className="control-img" style={{ transform: 'rotateZ(180deg)' }} src={FastForward} alt="make racechart slower" />
        Slower
    </button>
      <button className="chart-control-btn" onClick={props.onFaster}>
        <img className="control-img" src={FastForward} alt="make racechart faster" />
        Faster
    </button>
    <button className="chart-control-btn" onClick={props.onStepBackward}>
        <img className="control-img" src={StepForward} style={{ transform: 'rotateZ(180deg)' }} alt="racechart step backward" />
        Step Backward
    </button>
    <button className="chart-control-btn" onClick={props.onStepForward}>
        <img className="control-img" src={StepForward} alt="racechart step forward" />
        Step Forward
    </button>
    </div>
  </div>
}

export default RaceChartControls;