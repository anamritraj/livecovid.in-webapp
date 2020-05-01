import React from 'react';
import { useTranslation } from 'react-i18next';

const RangeSlider = ({max, value, handleSliderUpdate}) =>{
  const {t} = useTranslation();
  return <div>
    <input id="range" 
      type="range"
      value={value}
      min="0"
      max={max}
      onChange={handleSliderUpdate}
      step="1"
    /><br></br>
    <span style={{fontSize: '0.8em', color: '#7d7d7d'}}>{t('Use the slider to change date')}</span>
  </div>
}

export default RangeSlider;