import React, { Component } from "react";
import "./App.css";
import { SVG } from "@svgdotjs/svg.js";
import indiaMap from "./india-map";
import { getStateWiseData } from "./services/patients.service";
import Popover from "./Popover";

const percentColors = [
  { percent: 0.0, color: { r: 255, g: 255, b: 255 } },
  { percent: 0.5, color: { r: 199, g: 21, b: 21 } },
  { percent: 1.0, color: { r: 160, g: 0, b: 0 } }
];

// Calculate percent as minimum cases/ maximum cases. If % = 0, color should be white
const getColorBasedOnNoOfCases = percent => {
  if (percent == 0) {
    return "#fff";
  }
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (percent < percentColors[i].percent) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.percent - lower.percent;
  var rangepercent = (percent - lower.percent) / range;
  var percentLower = 1 - rangepercent;
  var percentUpper = rangepercent;

  var color = {
    r: Math.floor(lower.color.r * percentLower + upper.color.r * percentUpper),
    g: Math.floor(lower.color.g * percentLower + upper.color.g * percentUpper),
    b: Math.floor(lower.color.b * percentLower + upper.color.b * percentUpper)
  };

  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedState: {
        name: "",
        count: 0
      },
      statewise: {},
      total: {},
      dayChange: {},
      popover: {
        show: false,
        x: 0,
        y: 0
      },
      isMobile: document.documentElement.clientWidth < 768
    };
  }

  componentDidMount() {
    const indiaSvgMap = SVG(indiaMap).addTo("#india-state-map");

    getStateWiseData().then(({ data }) => {
      const max = data.total.max;
      console.log(data);
      Object.keys(data.statewise).map(key => {
        const color = getColorBasedOnNoOfCases(
          data.statewise[key].active / max
        );
        indiaSvgMap.findOne("#" + key).fill(color);
        indiaSvgMap.findOne("#" + key).on("mouseenter", e => {
          const selectedState = {
            name: data.statewise[key].name,
            count: data.statewise[key].confirmed
          };
          this.setState({
            ...this.state,
            selectedState
          });
        });

        indiaSvgMap.findOne("#" + key).on("mouseleave", e => {
          this.setState({
            ...this.state,
            popover: {
              ...this.state.popover,
              show: false
            }
          });
        });

        indiaSvgMap.findOne("#" + key).on("mousemove", e => {
          const gap = this.state.isMobile ? 20 : 50;
          const popover = {
            show: true,
            x: e.pageX + gap,
            y: e.pageY - gap
          };
          this.setState({
            ...this.state,
            popover
          });
        });
      });

      this.setState({
        ...this.state,
        statewise: data.statewise,
        total: data.total,
        dayChange: data.dayChange
      });
    });
  }

  indianStatesMap = () => {
    return (
      <div className="row">
        <div className="col-12">
          <div id="india-state-map"></div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <h1>COVID-19 India Tracker Statewise</h1>
          </div>
          <div className="row">
            <div className="col-3 col-6-sm card confirmed">
              <p className="delta">(+{this.state.dayChange.confirmed})</p>
              <p className="count">{this.state.total.confirmed}</p>
              <p className="title">Confirmed Cases</p>
            </div>
            <div className="col-3 col-6-sm card active">
              <p className="delta">(+{this.state.dayChange.confirmed})</p>
              <p className="count">{this.state.total.active}</p>
              <p className="title">Active Cases</p>
            </div>
            <div className="col-3 col-6-sm card recovered">
              <p className="delta">(+{this.state.dayChange.recovered})</p>
              <p className="count">{this.state.total.recovered}</p>
              <p className="title">Recovered</p>
            </div>
            <div className="col-3 col-6-sm card deceased">
              <p className="delta">(+{this.state.dayChange.deceased})</p>
              <p className="count">{this.state.total.deaths}</p>
              <p className="title">Deceased</p>
            </div>
          </div>
          {this.indianStatesMap()}
        </div>
        <Popover
          popover={this.state.popover}
          count={this.state.selectedState.count}
          name={this.state.selectedState.name}
        ></Popover>
      </>
    );
  }
}

export default App;
