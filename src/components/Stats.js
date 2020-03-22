import React from "react";

const Stats = props => {
  return (
    <div className="row stats">
      <div className="col-3 col-6-sm card confirmed">
        <p className="delta">(+{props.dayChange.confirmed})</p>
        <p className="count">{props.total.confirmed}</p>
        <p className="title">Confirmed Cases</p>
      </div>
      <div className="col-3 col-6-sm card active">
        <p className="delta">(+{props.dayChange.confirmed})</p>
        <p className="count">{props.total.active}</p>
        <p className="title">Active Cases</p>
      </div>
      <div className="col-3 col-6-sm card recovered">
        <p className="delta">(+{props.dayChange.recovered})</p>
        <p className="count">{props.total.recovered}</p>
        <p className="title">Recovered</p>
      </div>
      <div className="col-3 col-6-sm card deceased">
        <p className="delta">(+{props.dayChange.deceased})</p>
        <p className="count">{props.total.deaths}</p>
        <p className="title">Deceased</p>
      </div>
    </div>
  );
};

export default Stats;
