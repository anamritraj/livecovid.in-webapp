import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const getIndiaTimeSeries = () => {
  return axios.get(`${api}/india/timeseries`);
};

export default {
  getIndiaTimeSeries
};
