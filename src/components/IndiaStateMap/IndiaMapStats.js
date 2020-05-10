import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import * as population from '../../data/Population.json';

function calculateCases(cases, mode, state) {
  if (mode === 'normal')
    return Number(cases);
  const casesPerMillion = Math.round((Number(cases) / population.default[state]) * 1000000);
  return casesPerMillion.toLocaleString('en');
}

const IndiaMapStats = ({ stats, handleAttributeClick, activeAttribute, mode, state }) => {
  const { t } = useTranslation();
  const isNormal = mode === 'normal';
  return <>
    <div className="india-state-maps">
      <motion.div
        className="india-state-stats confirmed"
        animate={{ scaleY: activeAttribute === 'confirmed' ? 1.1 : 1 }}
        onClick={() => handleAttributeClick('confirmed')}
      >
        <h5>{calculateCases(stats.confirmed, mode, state)}</h5>
        {!isNormal && <h6>{t('cases per million')}</h6>}
        {isNormal && <h6>+{Number(stats.delta.confirmed).toLocaleString('en')}</h6>}
        <h4>{t('Confirmed')}</h4>
      </motion.div>
      <motion.div
        className="india-state-stats active"
        animate={{ scaleY: activeAttribute === 'active' ? 1.1 : 1 }}
        onClick={() => handleAttributeClick('active')}
      >
        <h5>{calculateCases(stats.active, mode, state)}</h5>
        {!isNormal && <h6>{t('cases per million')}</h6>}
        <h4>{t('Active')}</h4>
      </motion.div>
      <motion.div
        animate={{ scaleY: activeAttribute === 'recovered' ? 1.1 : 1 }}
        onClick={() => handleAttributeClick('recovered')}
        className="india-state-stats recovered"
      >
        <h5>{calculateCases(stats.recovered, mode, state)}</h5>
        {!isNormal && <h6>{t('cases per million')}</h6>}
        {isNormal && <h6>+{Number(stats.delta.recovered).toLocaleString('en')}</h6>}
        <h4>{t('Recovered')}</h4>
      </motion.div>
      <motion.div
        className="india-state-stats deaths"
        animate={{ scaleY: activeAttribute === 'deaths' ? 1.1 : 1 }}
        onClick={() => handleAttributeClick('deaths')}
      >
        <h5>{calculateCases(stats.deaths, mode, state)}</h5>
        {!isNormal && <h6>{t('cases per million')}</h6>}
        {isNormal && <h6>+{Number(stats.delta.deaths).toLocaleString('en')}</h6>}
        <h4>{t('Deaths')}</h4>
      </motion.div>
    </div>
    <div className="instruction">{t('Click on the tiles to see cases in that category')}</div>
  </>;
}

export default React.memo(IndiaMapStats);
