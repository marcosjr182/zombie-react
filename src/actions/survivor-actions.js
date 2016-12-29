import { toPoint } from '../helpers'
import { postReportInfection, getLocation } from '../api'

import { calculatePages } from '../ducks/pagination'
import { fetchItems, resetItems } from '../ducks/items'
import { fetchSurvivor } from '../ducks/survivor'
import { fetchSurvivorListPage } from '../ducks/survivors'
import { fetchSurvivors } from '../ducks/raw'
import { updateUser } from '../ducks/my-survivor'

export const initialFetch = () => (dispatch) => {
  dispatch(fetchSurvivors()).then((action) =>
    dispatch(calculatePages(action.payload))
  )
}

export const updateLocation = (data) => (dispatch) => {
  dispatch(retrieveLocation())
    .then((action) => {
      data.person.lonlat = toPoint(action.payload)
      dispatch(updateUser(data))
    }
  )
}

export const prepareSurvivorListPage = (list) => (dispatch) => {
  dispatch(fetchSurvivorListPage(list))
  dispatch(resetItems())
}

export const prepareSurvivor = (id) => (dispatch) => {
  dispatch(fetchSurvivor(id))
  dispatch(fetchItems(id))
}

export const REPORT_INFECTED_SURVIVOR = 'REPORT_INFECTED_SURVIVOR';
export const reportInfectedSurviorAction = () => ({
  type: REPORT_INFECTED_SURVIVOR,
  payload: {}
})

export const reportSurvivor = (userId, infected) => (dispatch) =>
  postReportInfection(userId, infected)
    .then(() => dispatch(reportInfectedSurviorAction()))


export const RETRIEVE_LOCATION = 'UPDATE_LOCATION';
export const retrieveLocationAction = (data) => ({
  type: RETRIEVE_LOCATION,
  payload: data
})

export const retrieveLocation = () => (dispatch) =>
  getLocation()
    .then((res) => dispatch(retrieveLocationAction(res.data)))
