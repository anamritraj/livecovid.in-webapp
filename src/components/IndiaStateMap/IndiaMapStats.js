import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const IndiaMapStats = ({ stats, handleAttributeClick, activeAttribute }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="india-state-maps">
        <motion.div
          className="india-state-stats confirmed"
          animate={{ scaleY: activeAttribute === 'confirmed' ? 1.1 : 1 }}
          onClick={() => handleAttributeClick('confirmed')}
        >
          <h5>{Number(stats.confirmed).toLocaleString('en')}</h5>
          <h6>
            +
            {Number(stats.delta.confirmed).toLocaleString('en')}
          </h6>
          <h4>{t('Confirmed')}</h4>
        </motion.div>
        <motion.div
          className="india-state-stats active"
          animate={{ scaleY: activeAttribute === 'active' ? 1.1 : 1 }}
          onClick={() => handleAttributeClick('active')}
        >
          <h5>{Number(stats.active).toLocaleString('en')}</h5>
          <h4>{t('Active')}</h4>
        </motion.div>
        <motion.div
          animate={{ scaleY: activeAttribute === 'recovered' ? 1.1 : 1 }}
          onClick={() => handleAttributeClick('recovered')}
          className="india-state-stats recovered"
        >
          <h5>{Number(stats.recovered).toLocaleString('en')}</h5>
          <h6>
            +
            {Number(stats.delta.recovered).toLocaleString('en')}
          </h6>
          <h4>{t('Recovered')}</h4>
        </motion.div>
        <motion.div
          className="india-state-stats deaths"
          animate={{ scaleY: activeAttribute === 'deaths' ? 1.1 : 1 }}
          onClick={() => handleAttributeClick('deaths')}
        >
          <h5>{Number(stats.deaths).toLocaleString('en')}</h5>
          <h6>
            +
            {Number(stats.delta.deaths).toLocaleString('en')}
          </h6>
          <h4>{t('Deaths')}</h4>
        </motion.div>
      </div>
      <div className="instruction">{t('Click on the tiles to see cases in that category')}</div>
    </>
  );
};

export default React.memo(IndiaMapStats);
