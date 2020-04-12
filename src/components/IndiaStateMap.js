import React, { useEffect, useState } from "react";
import { SVG } from "@svgdotjs/svg.js";
import indiaMap from "../india-map";
import Popover from "../Popover";

const percentColors = [
  { percent: 0.0, color: { r: 243, g: 206, b: 206 } },
  { percent: 1.0, color: { r: 160, g: 0, b: 0 } }
];

// Calculate percent as minimum cases/ maximum cases. If % = 0, color should be white
const getColorBasedOnNoOfCases = percent => {
  if (percent === 0) {
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

const IndiaStateMap = ({ statewise, isMobile, total }) => {
  const [popover, setPopover] = useState({ x: 0, y: 0, show: false });
  const [selectedState, setSelectedState] = useState({ name: "", count: 0 });
  useEffect(() => {
    const indiaSvgMap = SVG(indiaMap).addTo("#india-state-map");
    const max = total.max;
    Object.keys(statewise).forEach(key => {
      indiaSvgMap
        .findOne("#" + key)
        .fill(getColorBasedOnNoOfCases(statewise[key].active / max));

      indiaSvgMap.findOne("#" + key).on("mouseenter", e => {
        SVG(e.target).attr({
          "stroke-width": "5px"
        });
        setSelectedState({
          name: statewise[key].name,
          count: statewise[key].confirmed
        });
      });

      indiaSvgMap.findOne("#" + key).on("mouseleave", e => {
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
  }, [total.max]);

  return (
    <>
      <div id="india-state-map" className="card"></div>
      <Popover
        popover={popover}
        count={selectedState.count}
        name={selectedState.name}
      ></Popover>
    </>
  );
};

export default IndiaStateMap;
