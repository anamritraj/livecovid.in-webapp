import React from 'react';
import RangeSlider from './RangeSlider';
import { format } from 'date-fns';

const IndiaMapControls = ({ currentIndex,  max, date, handleSliderUpdate}) => {
  return <div className="map-controls">
    <div className="india-map-date">
      {format(new Date(date), "d MMMM yyyy")}
    </div>
    <RangeSlider value={currentIndex} max={max} handleSliderUpdate={handleSliderUpdate}></RangeSlider>
  </div>;
}

export default IndiaMapControls;