import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const IndiaMapInfo = ({ date, stateName }) => {
  const {t} = useTranslation();
  return <div className="india-map-info">
    <div className="state-name">
      {stateName === "Total" ? "India" : stateName}
    </div>
    <div className="india-map-date">
      {format(new Date(date), "d MMMM yyyy")}
    </div>
    <div className="instruction">
      {t('Click outside map to see country stats')}
    </div>
  </div>
}

export default IndiaMapInfo;