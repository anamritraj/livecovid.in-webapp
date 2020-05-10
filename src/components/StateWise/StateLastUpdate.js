import React from 'react';
import { formatDistance } from 'date-fns/esm';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import BellIcon from './BellIcon';
import StateWiseTestData from './StateWiseTestData';

const StateLastUpdate = ({
  testingData, time, stateCode, allNotificationsEnabled, statesNotificationStatus, handleBellClick,
}) => {
  const { t } = useTranslation();
  return (
    <div className="state-last-update">
      <StateWiseTestData testingData={testingData} />
      <div className="state-desc-header">
        <div className="last-updated-state">
          <span className="last-update-time">
            {t('Updated')}
            {' '}
            {formatDistance(time, new Date())}
            {' '}
            {t('ago at')}
            {' '}
            {format(time, 'dd MMM yyyy HH:mm')}
          </span>
          <br />
          Click on the bell icon to enable notifications for this state
        </div>
        <BellIcon
          stateCode={stateCode}
          districtName="all"
          handleBellClick={handleBellClick}
          isBellActive={allNotificationsEnabled || (statesNotificationStatus && statesNotificationStatus.all === true) || false}
          isDisabled={allNotificationsEnabled}
        />
      </div>
    </div>
  );
};

export default StateLastUpdate;
