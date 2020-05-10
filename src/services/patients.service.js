import axios from 'axios';

const api = process.env.REACT_APP_API_URL;

export const getStateWiseData = () => axios.get(`${api}/state`);

export const getDistrictWiseData = () => axios.get(`${api}/district`);

export const getStats = () => axios.get(`${api}/stats`);

export const getTestingData = () => axios.get(`${api}/states/testing`);
