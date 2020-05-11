import React from 'react';
import RangeSlider from './RangeSlider';
import Switch from './Switch';

const IndiaMapControls = ({
  currentIndex, max, activeAttribute, handleSliderUpdate, mode, changeMode,
}) => (
    <div className="map-controls">
      <RangeSlider
        value={currentIndex}
        max={max}
        handleSliderUpdate={handleSliderUpdate}
        activeAttribute={activeAttribute}
      />
      <Switch
        mode={mode}
        changeMode={changeMode}
        activeAttribute={activeAttribute}
      />
    </div>
  );
export default IndiaMapControls;
