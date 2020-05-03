import React from 'react';
import StateWiseTestData from './StateWiseTestData';
import { formatDistance } from 'date-fns/esm';
import { useTranslation } from 'react-i18next';
import BellIcon from './BellIcon';
import { format } from 'date-fns';

const StateLastUpdate = ({ testingData, time, stateCode, allNotificationsEnabled, statesNotificationStatus, handleBellClick}) =>{
  const {t} = useTranslation();
  return <div className="state-last-update">
    <StateWiseTestData testingData={testingData} />
    <div className="state-desc-header">
      <div className="last-updated-state">
        {" "}
        {t('Updated')} {formatDistance(time, new Date())} {t('ago at')}{" "}
        {format(time, "dd MMM yyyy HH:mm")}<br></br>
        Click on the bell icon to enable notifications for this state
      </div>
      <BellIcon
        stateCode={stateCode}
        districtName="all"
        handleBellClick={handleBellClick}
        isBellActive={allNotificationsEnabled || (statesNotificationStatus && statesNotificationStatus['all'] === true) || false}
        isDisabled={allNotificationsEnabled}
      ></BellIcon>
    </div>
  </div>
}

export default StateLastUpdate;