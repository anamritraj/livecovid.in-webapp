import React from 'react';
import { useTranslation } from 'react-i18next';

const Switch = ({ mode, setMode, activeAttribute }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="switch">
        <button
          className={
            "btn btn-chart " + (mode === 'normal' ? activeAttribute : "")
          }
          onClick={() => { setMode('normal') }}
        >
          Normal
      </button>
        <button
          className={
            "btn btn-chart " + (mode === 'per million' ? activeAttribute : "")
          }
          onClick={() => { setMode('per million') }}
        >
          Per Million
      </button>
      </div>
      <span style={{ fontSize: '0.8em', color: '#7d7d7d' }}>{t('Use the buttons to see the cases as per the state population in million')}</span>
    </>
  );
}

export default Switch;