import React from 'react';
import FastForward from './ff.svg';
import StepForward from './step-forward.svg'
import Restart from './restart.svg';
import Pause from './pause.svg';
import Play from './play.svg';
import { useTranslation } from 'react-i18next';

const RaceChartControls = (props) => {
  const { t } = useTranslation();

  return <div className="race-chart-controls">
    <div className="button-controls">
      <button className="chart-control-btn" onClick={props.onPause}>
        <img className="control-img" src={props.isPaused ? Play : Pause} alt="play/pause button" />
        {props.isPaused ? t('Play') : t('Pause')}
      </button>
      <button className="chart-control-btn" onClick={props.onRestart}>
        <img className="control-img" src={Restart} alt="restart racechart" />
        {t('Restart')}
    </button>
      <button className="chart-control-btn" onClick={props.onSlower}>
        <img className="control-img" style={{ transform: 'rotateZ(180deg)' }} src={FastForward} alt="make racechart slower" />
        {t('Slower')}
    </button>
      <button className="chart-control-btn" onClick={props.onFaster}>
        <img className="control-img" src={FastForward} alt="make racechart faster" />
        {t('Faster')}
    </button>
    <button className="chart-control-btn" onClick={props.onStepBackward}>
        <img className="control-img" src={StepForward} style={{ transform: 'rotateZ(180deg)' }} alt="racechart step backward" />
        {t('Step Backward')}
    </button>
    <button className="chart-control-btn" onClick={props.onStepForward}>
        <img className="control-img" src={StepForward} alt="racechart step forward" />
        {t('Step Forward')}
    </button>
    </div>
  </div>
}

export default RaceChartControls;