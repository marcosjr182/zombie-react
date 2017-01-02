import { toPoint } from '../helpers'
import { postReportInfection, getLocation } from '../api'
import { calculatePages } from '../selectors/survivor-list-selector'

import { fetchItems, resetItems } from '../ducks/items'
import { fetchSurvivor } from '../ducks/survivor'
import { fetchSurvivorListPage } from '../ducks/survivors'
import { fetchSurvivors } from '../ducks/raw'
import { updateUser } from '../ducks/my-survivor'
import { pagesQty } from '../ducks/pagination'

export const initialFetch = () => (dispatch) => {
  dispatch(fetchSurvivors()).then((action) =>
    dispatch(pagesQty(calculatePages(action.payload.length)))
  )
}

export const updateLocation = (data) => (dispatch) => {
  dispatch(retrieveLocation())
    .then((action) => {
      console.log(action);
      console.log(data);
      data.person.lonlat = toPoint(action.payload)
      dispatch(updateUser(data))
    }
  )
}

export const prepareSurvivorListPage = (list) => (dispatch) => {
  dispatch(resetItems())
  dispatch(fetchSurvivorListPage(list))
}

export const prepareSurvivor = (id) => (dispatch) => {
  dispatch(fetchSurvivor(id))
  dispatch(fetchItems(id))
}

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
