import axios from 'axios';
import { updatableSurvivor } from './selectors/survivor-selector'
import ENV from './env.json';

export const GET_LOCATION_URL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${ENV.GMAPS_KEY}`;

export const getPeople = () =>
  axios.get(`${ENV.BASE_URL}/people.json`)

export const getPerson = id =>
  axios.get(`${ENV.BASE_URL}/people/${id}.json`)

export const postReportInfection = (id, data) =>
  axios.post(`${ENV.BASE_URL}/people/${id}/report_infection.json`, data)

export const postPerson = survivor =>
  axios.post(`${ENV.BASE_URL}/people.json`, survivor)

export const patchPerson = survivor =>
  axios.patch(`${ENV.BASE_URL}/people/${survivor.id}.json`, updatableSurvivor(survivor))

export const getLocation = () =>
  axios.post(GET_LOCATION_URL)

export const getItems = (id) =>
  axios.get(`${ENV.BASE_URL}/people/${id}/properties.json`)

export const getReportList = () =>
  axios.get(`${ENV.BASE_URL}/report.json`)

export const getReport = (location) =>
  axios.get(location)

export const postTrade = (id, trade) =>
  axios.post(`${ENV.BASE_URL}/people/${id}/properties/trade_item.json`, trade)
