import React from 'react';
import RangeSlider from './RangeSlider';

const IndiaMapControls = ({
  currentIndex, max, activeAttribute, handleSliderUpdate,
}) => (
  <div className="map-controls">
    <RangeSlider
      value={currentIndex}
      max={max}
      handleSliderUpdate={handleSliderUpdate}
      activeAttribute={activeAttribute}
    />
  </div>
);

export default IndiaMapControls;
