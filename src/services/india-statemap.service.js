import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const getDistrictZonalInformation = () => {
  return axios.get(`${api}/states/zones`);
};


class DataManger {
  constructor(data, theme) {
    this.index = 0;
    this.dataStore = data;
    this.theme = theme;
    this.state = this.dataStore[0];
    this.totalElements = data.length;
  }

  getLatest = () => {
    return {
      state: this.dataStore[this.totalElements - 1],
      index: this.totalElements - 1
    };
  }
  restart = () => {
    this.index = 0;
    this.state = this.dataStore[0];
  }
  increment = () => {
    if (this.index + 1 < this.totalElements) {
      this.index++;
      this.state = this.dataStore[this.index];
    }
  }
  decrement = () => {
    if (this.index > 0) {
      this.index--;
      this.state = this.dataStore[this.index];
    }
  }
  getDataAtIndex = (index) => {
    return this.dataStore[index];
  }
  getCurrentData = () => {
    return {
      index :this.index,
      state: this.state
    }
  }
  moveTo = (index) => {
    if (index >= 0 && index < this.totalElements)
      this.state = this.dataStore[index];
  }
  isEnded = () => {
    return this.index + 1 === this.totalElements;
  }
}

class DistrictZonesDataManager extends DataManger {
  constructor(data, theme, mapColorData){
    // Sending the data as an array for now since there is not enough data to render as timeseries
    super([data], theme);
  }
}

// TODO: Inherit this StateManager from the above DataManager class.
const StateDataManager = () => {
  let index;
  let dataStore;
  let state;
  let totalElements;
  let mapColorData;
  const mapColorThemes = {
    light: {
      confirmed: [{ percent: 0.0, color: { r: 243, g: 206, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 10, b: 0 } }],
      active: [{ percent: 0.0, color: { r: 246, g: 231, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 156, b: 0 } }],
      deaths: [{ percent: 0.0, color: { r: 216, g: 216, b: 216 } },
      { percent: 1.0, color: { r: 71, g: 71, b: 71 } }],
      recovered: [{ percent: 0.0, color: { r: 196, g: 239, b: 175 } },
      { percent: 1.0, color: { r: 62, g: 161, b: 13 } }],
      confirmedPerMillion: [{ percent: 0.0, color: { r: 243, g: 206, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 10, b: 0 } }],
      activePerMillion: [{ percent: 0.0, color: { r: 246, g: 231, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 156, b: 0 } }],
      deathsPerMillion: [{ percent: 0.0, color: { r: 216, g: 216, b: 216 } },
      { percent: 1.0, color: { r: 71, g: 71, b: 71 } }],
      recoveredPerMillion: [{ percent: 0.0, color: { r: 196, g: 239, b: 175 } },
      { percent: 1.0, color: { r: 62, g: 161, b: 13 } }]
    },
    dark: {
      confirmed: [{ percent: 0.0, color: { r: 243, g: 206, b: 206 } },
      { percent: 1.0, color: { r: 160, g: 0, b: 0 } }],
      active: [{ percent: 0.0, color: { r: 246, g: 231, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 156, b: 0 } }],
      deaths: [{ percent: 0.0, color: { r: 216, g: 216, b: 216 } },
      { percent: 1.0, color: { r: 71, g: 71, b: 71 } }],
      recovered: [{ percent: 0.0, color: { r: 196, g: 239, b: 175 } },
      { percent: 1.0, color: { r: 62, g: 161, b: 13 } }],
      confirmedPerMillion: [{ percent: 0.0, color: { r: 243, g: 206, b: 206 } },
      { percent: 1.0, color: { r: 160, g: 0, b: 0 } }],
      activePerMillion: [{ percent: 0.0, color: { r: 246, g: 231, b: 206 } },
      { percent: 1.0, color: { r: 255, g: 156, b: 0 } }],
      deathsPerMillion: [{ percent: 0.0, color: { r: 216, g: 216, b: 216 } },
      { percent: 1.0, color: { r: 71, g: 71, b: 71 } }],
      recoveredPerMillion: [{ percent: 0.0, color: { r: 196, g: 239, b: 175 } },
      { percent: 1.0, color: { r: 62, g: 161, b: 13 } }]
    }
  }

  const getMapColorBasedOnCases = (theme) => {
    mapColorData = {};
    const opacity = theme === 'dark' ? 0.67 : 1;
    if (mapColorData[theme]) {
      return mapColorData;
    }
    mapColorData[theme] = {};

    ['active', 'confirmed', 'deaths', 'recovered', 'activePerMillion', 'confirmedPerMillion', 'deathsPerMillion', 'recoveredPerMillion'].forEach((attributeKey) => {
      mapColorData[theme][attributeKey] = mapColorData[theme][attributeKey] || {};
      const mapColors = mapColorThemes[theme][attributeKey];
      dataStore.forEach(dayObject => {
        const maxObject = dayObject.max;
        const statewise = dayObject.data;
        const date = dayObject.date;
        const stateWiseColorsMap = {};
        Object.keys(statewise).forEach((stateKey) => {
          const percent = statewise[stateKey].value[attributeKey] / maxObject[attributeKey];
          if (percent === 0) {
            stateWiseColorsMap[stateKey] = "#fff"; // Replace with default color for that attribute key
            return;
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
            b: Math.floor(lower.color.b * percentLower + upper.color.b * percentUpper),
          };
          stateWiseColorsMap[stateKey] = "rgb(" + [color.r, color.g, color.b, opacity].join(",") + ")";
        })
        mapColorData[theme][attributeKey][date] = stateWiseColorsMap;
      });
    })
  }

  return {
    initialise: (data, theme) => {
      index = 0;
      dataStore = data;
      state = data[index];
      totalElements = data.length;
      // Put this inside a setTimeout if the rendering time becomes too high
      getMapColorBasedOnCases(theme);
    },
    getLatest: () => {
      return {
        state: dataStore[totalElements - 1],
        index: totalElements - 1
      };
    },
    restart: () => {
      index = 0;
      state = dataStore[0];
    },
    increment: () => {
      if (index + 1 < totalElements) {
        index++;
        state = dataStore[index];
      }
    },
    decrement: () => {
      if (index > 0) {
        index--;
        state = dataStore[index];
      }
    },
    getDataAtIndex: (index) => {
      return dataStore[index];
    },
    getCurrentData: () => {
      return {
        index,
        state
      }
    },
    moveTo: (index) => {
      if (index >= 0 && index < totalElements)
        state = dataStore[index];
    },
    isEnded: () => {
      return index + 1 === totalElements;
    },
    getMapColorData: (theme, fieldKey, date) => {
      if (!mapColorData) return {};
      return mapColorData[theme][fieldKey][date];
    },
    changeStyle: (theme) => {
      getMapColorBasedOnCases(theme);
    }
  }
}

export { StateDataManager, DistrictZonesDataManager};

