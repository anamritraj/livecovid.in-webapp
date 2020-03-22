import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export const getStateWiseData = () => {
  return axios.get(`${api}/state`);
};
