import React from "react";

const Stats = props => {

  return (

    <div className="row stats">
      <div className="col-3 col-6-sm card confirmed">
        <p className="delta">(+{props.dayChange.confirmed})</p>
        <p className="count">{props.total.confirmed}</p>
        <p className="title">Confirmed Cases</p>
      </div>
      <div className="col-3 col-6-sm card tested">
        <p className="delta">(+{props.tested.delta})</p>
        <p className="count">{props.tested.totalsamplestested}</p>
        <p className="title">Tested</p>
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

      <div className="col-4 col-6-sm card confirmed">
        <p className="delta">(+{(100*props.dayChange.confirmed/props.tested.delta).toPrecision(3)}) %</p>
        <p className="count">{(100*props.total.confirmed/props.tested.totalsamplestested).toPrecision(3)} %</p>
        <p className="title">Confirmed Cases</p>
      </div>

      <div className="col-4 col-6-sm card recovered">
        <p className="delta">(+{(100*props.dayChange.recovered/props.dayChange.confirmed).toPrecision(3)}) %</p>
        <p className="count">{(100*props.total.recovered/props.total.confirmed).toPrecision(3)} %</p>
        <p className="title">Recovered </p>
      </div>
      <div className="col-4 col-6-sm card deceased">
        <p className="delta">(+{(100*props.dayChange.deceased/props.dayChange.confirmed).toPrecision(3)}) %</p>
        <p className="count">{(100*props.total.deaths/props.total.confirmed).toPrecision(3)} %</p>
        <p className="title">Deceased </p>
      </div>
    </div>



  );
};

export default Stats;
