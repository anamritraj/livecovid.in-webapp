import React from 'react'
import { useTranslation } from 'react-i18next'

const Switch = ({ mode, setMode, activeAttribute }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="switch">
        <button
          className={`btn btn-chart ${mode === 'normal' ? activeAttribute : ''}`}
          onClick={() => {
            setMode('normal')
          }}
        >
          {t('Normal')}
        </button>
        <button
          className={`btn btn-chart ${
            mode === 'per-million' ? activeAttribute : ''
          }`}
          onClick={() => {
            setMode('per-million')
          }}
        >
          {t('Per Million')}
        </button>
      </div>
      <span style={{ fontSize: '0.8em', color: '#7d7d7d' }}>
        {t(
          'Use the buttons to switch between Total Cases and Cases per million population '
        )}
        <a
          href="https://en.wikipedia.org/wiki/List_of_states_and_union_territories_of_India_by_population"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Population Source')}
        </a>
      </span>
    </>
  )
}

export default Switch
