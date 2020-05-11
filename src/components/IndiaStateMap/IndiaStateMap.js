import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import IndiaMapStats from './IndiaMapStats';
import IndiaMapInfo from './IndiaMapInfo';
import IndiaMapControls from './IndiaMapControls';
import IndiaMapSVG from './IndiaMapSVG';
import { getStatesTimeseries } from '../../services/charts.service';
import { StateDataManager } from '../../services/india-statemap.service';
import { sendEventToGA } from '../../services/analytics.service';

const Loading = React.memo(() => <div>Loading..</div>);

const stateDataManager = StateDataManager();
const intialMapColor = stateDataManager.getMapColorData();

const IndiaStateMap = ({ isMobile, theme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('total');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAttribute, setActiveAttribute] = useState('confirmed');
  const [mapInfo, setMapInfo] = useState({ name: 'India' });
  const [mapColors, setMapColors] = useState(intialMapColor);
  const [mode, setMode] = useState('normal');
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading) {
      setMapColors(stateDataManager.changeStyle(theme));
    }
  }, [theme, isLoading]);

  // Make a network request and get data for the map
  useEffect(() => {
    getStatesTimeseries().then((result) => {
      if (result.status === 200) {
        stateDataManager.initialise(result.data, theme);
        setCurrentIndex(result.data.length - 1);
        setMapColors(stateDataManager.getMapColorData(theme, 'confirmed', stateDataManager.getDataAtIndex(result.data.length - 1).date));
        setIsLoading(false);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  useEffect(() => {
    if (!isLoading) {
      setMapColors(stateDataManager.getMapColorData(theme, activeAttribute, stateDataManager.getDataAtIndex(currentIndex).date));
      stateDataManager.moveTo(currentIndex);
    }
  }, [currentIndex, activeAttribute, isLoading, theme]);

  const handleSliderUpdate = (e) => {
    setCurrentIndex(e.target.value);
  };

  const handleMapMouseLeave = useCallback(() => {
  }, []);

  const handleMapMouseEnter = (stateCode) => {
    setSelectedState(stateCode);
    setMapInfo({ name: stateDataManager.getDataAtIndex(currentIndex).data[stateCode].name });
  };

  const handleAttributeClick = useCallback((attribute) => {
    sendEventToGA('User', 'Changed Active Map Attribute', attribute);
    setActiveAttribute(attribute);
  }, []);

  const changeMode = (mode, attribute) => {
    setMode(mode);
    setActiveAttribute(attribute);
  }

  return isLoading ? <Loading /> : (
    <div className="card chart chart-controls">
      <h2>{t('State-wise COVID-19 Cases India')}</h2>
      <IndiaMapStats
        activeAttribute={activeAttribute}
        mode={mode}
        state={stateDataManager.getDataAtIndex(currentIndex).data[selectedState].name}
        stats={stateDataManager.getDataAtIndex(currentIndex).data[selectedState].value}
        handleAttributeClick={handleAttributeClick}
      />
      <div className="india-svg-map">
        <IndiaMapInfo
          date={stateDataManager.getDataAtIndex(currentIndex).date}
          mapInfo={mapInfo}
          showInstruction
        />
        <IndiaMapSVG
          activeAttribute={activeAttribute}
          statewiseColors={mapColors}
          handleMouseLeave={handleMapMouseLeave}
          handleMouseEnter={handleMapMouseEnter}
        />
      </div>
      <IndiaMapControls
        activeAttribute={activeAttribute}
        currentIndex={currentIndex}
        handleSliderUpdate={handleSliderUpdate}
        max={stateDataManager.getLatest().index}
        mode={mode}
        changeMode={changeMode}
      />
    </div>
  );
};

export default IndiaStateMap;
