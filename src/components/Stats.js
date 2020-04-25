import React from "react";
import { useTranslation } from 'react-i18next';

const Stats = props => {
  const { t } = useTranslation();

  return (
    <div className="row stats">
      <div className="col-3 col-6-sm card confirmed">
        <p className="delta">(+{props.dayChange.confirmed})</p>
        <p className="count">{props.total.confirmed}</p>
        <p className="title">{t('Confirmed Cases')}</p>
      </div>
      <div className="col-3 col-6-sm card tested">
        <p className="delta">(+{props.tested.delta})</p>
        <p className="count">{props.tested.totalsamplestested}</p>
        <p className="title">{t('Tested')}</p>
      </div>
      <div className="col-3 col-6-sm card recovered">
        <p className="delta">(+{props.dayChange.recovered})</p>
        <p className="count">{props.total.recovered}</p>
        <p className="title">{t('Recovered')}</p>
      </div>
      <div className="col-3 col-6-sm card deceased">
        <p className="delta">(+{props.dayChange.deceased})</p>
        <p className="count">{props.total.deaths}</p>
        <p className="title">{t('Deceased')}</p>
      </div>
    </div>
  );
};

export default Stats;
