import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const IndiaMapStats = ({
  stats, handleAttributeClick, activeAttribute, mode, state,
}) => {
  const { t } = useTranslation();
  const isNormal = mode === 'normal';
  const confirmAttribute = isNormal ? 'confirmed' : 'confirmedPerMillion';
  const activesAttribute = isNormal ? 'active' : 'activePerMillion';
  const recoveredAttribute = isNormal ? 'recovered' : 'recoveredPerMillion';
  const deathAttribute = isNormal ? 'deaths' : 'deathsPerMillion';
  return (
    <>
      <div className="india-state-maps">
        <motion.div
          className="india-state-stats confirmed"
          animate={{ scaleY: activeAttribute === confirmAttribute ? 1.1 : 1 }}
          onClick={() => handleAttributeClick(confirmAttribute)}
        >
          <h5>{Number(stats[confirmAttribute]).toLocaleString('en')}</h5>
          {isNormal && (
            <h6>
              +
              {Number(stats.delta.confirmed).toLocaleString('en')}
            </h6>
          )}
          <h4>{t('Confirmed')}</h4>
          {!isNormal && <h6>{t('per million')}</h6>}
        </motion.div>
        <motion.div
          className="india-state-stats active"
          animate={{ scaleY: activeAttribute === activesAttribute ? 1.1 : 1 }}
          onClick={() => handleAttributeClick(activesAttribute)}
        >
          <h5>{Number(stats[activesAttribute]).toLocaleString('en')}</h5>
          <h4>{t('Active')}</h4>
          {!isNormal && <h6>{t('per million')}</h6>}
        </motion.div>
        <motion.div
          animate={{ scaleY: activeAttribute === recoveredAttribute ? 1.1 : 1 }}
          onClick={() => handleAttributeClick(recoveredAttribute)}
          className="india-state-stats recovered"
        >
          <h5>{Number(stats[recoveredAttribute]).toLocaleString('en')}</h5>
          {isNormal && (
            <h6>
              +
              {Number(stats.delta.recovered).toLocaleString('en')}
            </h6>
          )}
          <h4>{t('Recovered')}</h4>
          {!isNormal && <h6>{t('per million')}</h6>}
        </motion.div>
        <motion.div
          className="india-state-stats deaths"
          animate={{ scaleY: activeAttribute === deathAttribute ? 1.1 : 1 }}
          onClick={() => handleAttributeClick(deathAttribute)}
        >
          <h5>{Number(stats[deathAttribute]).toLocaleString('en')}</h5>
          {isNormal && (
            <h6>
              +
              {Number(stats.delta.deaths).toLocaleString('en')}
            </h6>
          )}
          <h4>{t('Deaths')}</h4>
          {!isNormal && <h6>{t('per million')}</h6>}
        </motion.div>
      </div>
      <div className="instruction">{t('Click on the tiles to see cases in that category')}</div>
    </>
  );
};

export default React.memo(IndiaMapStats);
