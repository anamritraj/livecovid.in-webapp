import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import IndiaMapStats from "./IndiaMapStats";
import { getStatesTimeseries } from "../../services/charts.service";
import IndiaMapControls from "./IndiaMapControls";
import IndiaMapSVG from "./IndiaMapSVG";
import StateDataManager from "../../services/india-statemap.service";
import IndiaMapInfo from "./IndiaMapInfo";

const Loading = React.memo(() => {
  return <div>Loading..</div>
})

const stateDataManager = StateDataManager();
let intialMapColor = stateDataManager.getMapColorData();

const IndiaStateMap = ({ isMobile, theme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("total");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAttribute, setActiveAttribute] = useState('confirmed');
  const [mapColors, setMapColors] = useState(intialMapColor);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading) {
      setMapColors(stateDataManager.changeStyle(theme));
    }
  }, [theme, isLoading])

  // Make a network request and get data for the map
  useEffect(() => {
    getStatesTimeseries().then((result) => {
      if (result.status === 200) {
        stateDataManager.initialise(result.data, theme);
        setCurrentIndex(result.data.length - 1);
        setMapColors(stateDataManager.getMapColorData(theme, 'confirmed', stateDataManager.getDataAtIndex(result.data.length - 1).date));
        setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
    })
  }, [])


  useEffect(() => {
    if (!isLoading) {
      setMapColors(stateDataManager.getMapColorData(theme, activeAttribute, stateDataManager.getDataAtIndex(currentIndex).date));
      stateDataManager.moveTo(currentIndex);
    }
  }, [currentIndex, activeAttribute, isLoading, theme])

  const handleSliderUpdate = (e) => {
    setCurrentIndex(e.target.value);
  }

  const handleMapMouseLeave = useCallback(() => {
  }, []);

  const handleMapMouseEnter = (stateCode) => {
    setSelectedState(stateCode);
  }

  const handleAttributeClick = useCallback((attribute) => {
    setActiveAttribute(attribute);
  }, [])

  return isLoading ? <Loading></Loading> : (
    <div className="card chart chart-controls">
      <h2>{t('State-wise COVID-19 Cases India')}</h2>
      <IndiaMapStats
        activeAttribute={activeAttribute}
        stats={stateDataManager.getDataAtIndex(currentIndex).data[selectedState].value}
        handleAttributeClick={handleAttributeClick}
      ></IndiaMapStats>
      <div className="india-svg-map">
        <IndiaMapInfo
          date={stateDataManager.getDataAtIndex(currentIndex).date}
          stateName={stateDataManager.getDataAtIndex(currentIndex).data[selectedState].name}
        ></IndiaMapInfo>
        <IndiaMapSVG
          activeAttribute={activeAttribute}
          statewiseColors={mapColors}
          handleMouseLeave={handleMapMouseLeave}
          handleMouseEnter={handleMapMouseEnter}
        ></IndiaMapSVG>
      </div>
      <IndiaMapControls
        currentIndex={currentIndex}
        date={stateDataManager.getDataAtIndex(currentIndex).date}
        handleSliderUpdate={handleSliderUpdate}
        max={stateDataManager.getLatest().index}></IndiaMapControls>
    </div>
  );
};

export default IndiaStateMap;
