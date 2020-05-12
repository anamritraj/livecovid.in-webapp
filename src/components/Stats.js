import React from 'react';
import { useTranslation } from 'react-i18next';

const Stats = (props) => {
  const { t } = useTranslation();

  return (
    <div className="stats-grid">
      <div className=" card confirmed">
        <p className="delta">
          (+
          {Number(props.dayChange.confirmed).toLocaleString('en')}
          )
        </p>
        <p className="count">{Number(props.total.confirmed).toLocaleString('en')}</p>
        <p className="title">{t('Confirmed Cases')}</p>
      </div>
      <div className=" card tested">
        <p className="delta">
          (+
          {Number(props.tested.delta).toLocaleString('en')}
          )
        </p>
        <p className="count">{Number(props.tested.totalsamplestested).toLocaleString('en')}</p>
        <p className="title">{t('Tested')}</p>
      </div>
      <div className=" card recovered">
        <p className="delta">
          (+
          {Number(props.dayChange.recovered).toLocaleString('en')}
          )
        </p>
        <p className="count">{Number(props.total.recovered).toLocaleString('en')}</p>
        <p className="title">{t('Recovered')}</p>
      </div>
      <div className=" card deceased">
        <p className="delta">
          (+
          {Number(props.dayChange.deceased).toLocaleString('en')}
          )
        </p>
        <p className="count">{Number(props.total.deaths).toLocaleString('en')}</p>
        <p className="title">{t('Deceased')}</p>
      </div>
    </div>
  );
};

export default Stats;
