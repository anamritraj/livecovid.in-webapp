import React from 'react';
import RangeSlider from './RangeSlider';
import Switch from './Switch';

const IndiaMapControls = ({ currentIndex, max, activeAttribute, handleSliderUpdate, mode, setMode }) => {
  return <div className="map-controls">
    <Switch
      mode={mode}
      setMode={setMode}
      activeAttribute={activeAttribute}
    />
    <RangeSlider
      value={currentIndex}
      max={max}
      handleSliderUpdate={handleSliderUpdate}
      activeAttribute={activeAttribute}
    />
  </div>;
}

export default IndiaMapControls;