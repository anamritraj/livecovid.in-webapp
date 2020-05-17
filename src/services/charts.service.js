import axios from 'axios'

const api = process.env.REACT_APP_API_URL

export const getIndiaTimeSeries = () => axios.get(`${api}/india/timeseries`)

export const getStatesRaceChart = () => axios.get(`${api}/states/racechart`)

export const getStatesTimeseries = () => axios.get(`${api}/states/timeseries`)

export default {
  getIndiaTimeSeries,
}
