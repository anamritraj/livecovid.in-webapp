import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RowTableAccordion from './RowTableAccordion';
import { sendEventToGA } from '../../services/analytics.service';
import ChevronIcon from './ChevronIcon';

const category = 'User';
const action = 'Clicked State Row';

const StateWiseRow = ({
  state, districts, handleBellClick, allNotificationsEnabled, statesNotificationStatus, testingData, isMobile,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const { t } = useTranslation();

  return state.active > 0
    ? [
      <tr
        onClick={() => { setIsHidden(!isHidden); sendEventToGA(category, action, state.name); }}
        className={`state-row ${isHidden ? '' : 'open'}`}
        key={state.name}
      >
        <td className="expand-icon">
          <ChevronIcon />
        </td>
        <td>{t(`states:${state.name}`)}</td>
        <td>
          {state.delta.confirmed ? (
            <span className="delta confirmed">
              +
              {Number(state.delta.confirmed).toLocaleString('en')}
            </span>
          ) : ('')}
          {' '}
          {Number(state.confirmed).toLocaleString('en')}
        </td>
        <td>
          {Number(state.active).toLocaleString('en')}
        </td>
        <td>
          {state.delta.recovered ? (
            <span className="delta recovered">
              +
              { Number(state.delta.recovered).toLocaleString('en')}
            </span>
          ) : ('')}
          {' '}
          {Number(state.recovered).toLocaleString('en')}
        </td>
        <td>
          {state.delta.deaths ? (
            <span className="delta deaths">
              +
              {Number(state.delta.deaths).toLocaleString('en')}
            </span>
          ) : ('')}
          {' '}
          {Number(state.deaths).toLocaleString('en')}
        </td>
      </tr>,
      districts.districts ? (
        <RowTableAccordion
          lastUpdated={state.lastUpdated}
          districts={districts.districts}
          isHidden={isHidden}
          stateCode={state.code}
          key={state.code}
          handleBellClick={handleBellClick}
          allNotificationsEnabled={allNotificationsEnabled}
          statesNotificationStatus={statesNotificationStatus}
          testingData={testingData}
        />
      ) : null,
    ]
    : null;
};

export default React.memo(StateWiseRow);
