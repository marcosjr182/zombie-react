import { postReportInfection, getLocation } from '../api'

const REPORT_INFECTED_SURVIVOR = 'REPORT_INFECTED_SURVIVOR';
export const reportInfectedSurvivorAction = () => ({
  type: REPORT_INFECTED_SURVIVOR,
  payload: {}
})

export const reportInfectedSurvivor = (userId, data) => (dispatch) =>
  postReportInfection(userId, data)
    .then(() => dispatch(reportInfectedSurvivorAction()))

const RETRIEVE_LOCATION = 'RETRIEVE_LOCATION';
export const retrieveLocationAction = (data) => ({
  type: RETRIEVE_LOCATION,
  payload: data.location
})

export const retrieveLocation = () => (dispatch) =>
  getLocation()
    .then((res) => dispatch(retrieveLocationAction(res.data)))
