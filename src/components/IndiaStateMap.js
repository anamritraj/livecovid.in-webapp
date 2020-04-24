import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SVG } from "@svgdotjs/svg.js";
import indiaMap from "../india-map";
import Popover from "../Popover";

const lightThemeMapColors = [
  { percent: 0.0, color: { r: 243, g: 206, b: 206 } },
  { percent: 1.0, color: { r: 160, g: 0, b: 0 } }
];
const darkThemeMapColors = [
  { percent: 0.0, color: { r: 224, g: 243, b: 248 } },
  { percent: 1.0, color: { r: 69, g: 117, b: 180 } }
];

const debounce = (func, delay) => {
  let inDebounce
  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() =>
      func.apply(context, args)
      , delay)
  }
}

// Calculate percent as minimum cases/ maximum cases. If % = 0, color should be white
const getColorBasedOnNoOfCases = (percent, isDarkTheme) => {
  if (percent === 0) {
    return "#fff";
  }
  let mapColors = lightThemeMapColors;
  if (isDarkTheme) {
    mapColors = darkThemeMapColors;
  }

  for (var i = 1; i < mapColors.length - 1; i++) {
    if (percent < mapColors[i].percent) {
      break;
    }
  }
  var lower = mapColors[i - 1];
  var upper = mapColors[i];
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

const assginColorToMap = (indiaSvgMap, max, isDarkTheme, statewise) => {
  indiaSvgMap && Object.keys(statewise).forEach(key => {
    indiaSvgMap
      .findOne("#" + key)
      .fill(getColorBasedOnNoOfCases(statewise[key].active / max, isDarkTheme));
  });
}

const IndiaStateMap = ({ statewise, isMobile, total, isDarkTheme }) => {
  const [popover, setPopover] = useState({ x: 0, y: 0, show: false });
  const [selectedState, setSelectedState] = useState({ name: "", count: 0 });
  const [indiaMapSaved, setIndiaMapSaved] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    assginColorToMap(indiaMapSaved, total.max, isDarkTheme, statewise)
  }, [isDarkTheme]);

  useEffect(() => {
    const indiaSvgMap = SVG(indiaMap).addTo("#india-state-map");
    setIndiaMapSaved(indiaSvgMap);
    const max = total.max;
    console.log("Theme changed to", isDarkTheme);
    assginColorToMap(indiaSvgMap, max, isDarkTheme, statewise)
    Object.keys(statewise).forEach(key => {
      // This will hide the popover on mobile devices when user scrolls.
      document.body.addEventListener("touchmove", debounce(() => {
        indiaSvgMap.findOne("#" + key).fire('touchmove')
      }, 1000));

      indiaSvgMap.findOne("#" + key).on("mouseenter", e => {
        SVG(e.target).attr({
          "stroke-width": "5px"
        });
        setSelectedState({
          name: statewise[key].name,
          count: statewise[key].confirmed
        });
      });

      indiaSvgMap.findOne("#" + key).on(["mouseleave", "touchmove"], e => {
        SVG(e.target).attr({
          "stroke-width": "2px"
        });
        setPopover({
          ...popover,
          show: false
        });
      });

      indiaSvgMap.findOne("#" + key).on("mousemove", e => {
        let gapX = isMobile ? 20 : 50;
        let gapY = isMobile ? 20 : 50;
        if (e.clientX + gapX > document.defaultView.outerWidth * 0.65) {
          gapX = -100;
        }
        setPopover({
          show: true,
          x: e.clientX + gapX,
          y: e.clientY - gapY
        });
      });
    });

    return () => {
      Object.keys(statewise).forEach(key => {
        indiaSvgMap.findOne("#" + key).off();
      });
      document.body.removeEventListener("touchmove", null);
    }
  }, [total.max]);


  return (
    <div className="card chart">
      <div className="chart-controls">
        <h2>{t('COVID-19 Cases India - State-wise')}</h2>
      </div>
      <div id="india-state-map"></div>
      <Popover
        popover={popover}
        count={selectedState.count}
        name={selectedState.name}
      ></Popover>
    </div>
  );
};

export default IndiaStateMap;
