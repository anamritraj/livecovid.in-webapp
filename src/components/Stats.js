import React from 'react';
import { useTranslation } from 'react-i18next';

const calculatePercentage = (cases, total) => ((cases / total) * 100).toFixed(2).toLocaleString('en');

const Stats = (props) => {
  const { t } = useTranslation();
  const { confirmed, recovered, deaths } = props.total;
  return (
    <div className="stats-grid">
      <div className=" card confirmed">
        <p className="delta">
          (
          {props.dayChange.confirmed > 0 ? `+ ${Number(props.dayChange.confirmed).toLocaleString('en')}` : '+0'}
          )
        </p>
        <p className="count">{Number(confirmed).toLocaleString('en')}</p>
        <p className="title">{t('Confirmed Cases')}</p>
        <p className="percent">{calculatePercentage(confirmed, props.tested.totalsamplestested) + t('% of Total Tested')}</p>
      </div>
      <div className=" card tested">
        <p className="delta">
          (
          {props.tested.delta > 0 ? `+ ${Number(props.tested.delta).toLocaleString('en')}` : '+0'}
          )
        </p>
        <p className="count">{Number(props.tested.totalsamplestested).toLocaleString('en')}</p>
        <p className="title">{t('Tested')}</p>
      </div>
      <div className=" card recovered">
        <p className="delta">
          (
          {props.dayChange.recovered > 0 ? `+ ${Number(props.dayChange.recovered).toLocaleString('en')}` : '+0'}
          )
        </p>
        <p className="count">{Number(recovered).toLocaleString('en')}</p>
        <p className="title">{t('Recovered')}</p>
        <p className="percent">{calculatePercentage(recovered, confirmed) + t('% of Total Confirmed')}</p>
      </div>
      <div className=" card deceased">
        <p className="delta">
          (
          {props.dayChange.deceased > 0 ? `+ ${Number(props.dayChange.deceased).toLocaleString('en')}` : '+0'}
          )
        </p>
        <p className="count">{Number(deaths).toLocaleString('en')}</p>
        <p className="title">{t('Deceased')}</p>
        <p className="percent">{calculatePercentage(deaths, confirmed) + t('% of Total Confirmed')}</p>
      </div>
    </div>
  );
};

export default Stats;
