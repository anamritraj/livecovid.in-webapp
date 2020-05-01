import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const getIndiaTimeSeries = () => {
  return axios.get(`${api}/india/timeseries`);
};

export const getStatesRaceChart = () => {
  return axios.get(`${api}/states/racechart`);
};

export const getStatesTimeseries = () => {
  return axios.get(`${api}/states/timeseries`);
};

export default {
  getIndiaTimeSeries
};
