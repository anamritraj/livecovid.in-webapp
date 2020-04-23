import axios from "axios";
import { stateCodes } from '../constants'
const api = process.env.REACT_APP_API_URL;

export const getStateWiseData = () => {
  return axios.get(`${api}/state`);
};

export const getDistrictWiseData = () => {
  return axios.get(`${api}/district`);
};

export const getStats = () => {
  return axios.get(`${api}/stats`);
};

export const getTestingData = async () => {
  try {
    const resp = await axios.get('https://api.covid19india.org/state_test_data.json')
    const result = {}
    for (const stateDetail of resp.data.states_tested_data) {
      if (stateDetail.totaltested) result[stateCodes[stateDetail.state].toLowerCase()] = stateDetail
    }
    return result
  } catch(err) {
    console.log(err)
  }
}