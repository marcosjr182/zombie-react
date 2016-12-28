import { parseLocation, toPoint } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         getItems, postTrade } from '../api';

const PER_PAGE = 12;

export const initialFetch = () => (dispatch) => {
  dispatch(fetchSurvivors()).then((action) =>
    dispatch(calculatePages(action.payload))
  )
}

export const prepareSurvivorListPage = (list) => (dispatch) => {
  dispatch(fetchSurvivorListPageAction(list))
  dispatch(resetItemsAction())
}

export const prepareSurvivorPage = (id) => (dispatch) => {
  dispatch(fetchSurvivor(id))
  dispatch(fetchItems(id))
}

export const FETCH_SURVIVORS = 'FETCH_SURVIVORS';
export const fetchSurvivorsAction = data => ({
  type: FETCH_SURVIVORS,
  payload: data
})

export const fetchSurvivors = () => (dispatch) =>
  getPeople()
    .then((res) => dispatch(fetchSurvivorsAction(res.data)))


export const RESET_ITEMS = 'RESET_ITEMS'
export const resetItemsAction = () => ({
  type: RESET_ITEMS,
  payload: []
})

export const FETCH_SURVIVOR_LIST_PAGE = 'FETCH_SURVIVOR_LIST_PAGE';
export const fetchSurvivorListPageAction = data => ({
  type: FETCH_SURVIVOR_LIST_PAGE,
  payload: data
})
export const fetchSurvivorListPage = (list) => (dispatch) =>
  dispatch(fetchSurvivorListPageAction(list))
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const fetchItemsAction = (survivorId, items) => ({
  type: FETCH_ITEMS,
  payload: { survivorId, items }
})

export const fetchItems = (survivorId) => (dispatch) =>
  getItems(survivorId)
    .then( (res) =>
      dispatch(fetchItemsAction(survivorId, res.data))
    )

export const CALCULATE_PAGES = 'CALCULATE_PAGES';
export const caculatePagesAction = data => ({
  type: CALCULATE_PAGES,
  payload: data
})

export const calculatePages = (list) => (dispatch) =>
  dispatch(caculatePagesAction(Math.floor(list.length / PER_PAGE)-1))


export const FETCH_SURVIVOR = 'FETCH_SURVIVOR';

export const fetchSurvivorAction = data => ({
  type: FETCH_SURVIVOR,
  payload: data
})

export const fetchSurvivor = (id) => (dispatch) =>
  getPerson(id)
    .then((res) => dispatch(fetchSurvivorAction(res.data)));

const REPORT_INFECTED_SURVIVOR = 'REPORT_INFECTED_SURVIVOR';
const REPORT_FAILED = 'REPORT_FAILED';

export const reportInfectedSurviorAction = () => ({
  type: REPORT_INFECTED_SURVIVOR,
  payload: {}
})

export const reportInfectedSurviorActionFailed = () =>
  ({ type: REPORT_FAILED })

export const reportSurvivor = (infected) => (dispatch) =>
  postReportInfection(getUser().id, infected)
    .then(
      () => dispatch(reportInfectedSurviorAction()),
      (err) => {console.log(err), dispatch(reportInfectedSurviorActionFailed())}
    )


export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const updateLocationAction = (data) => ({
  type: UPDATE_LOCATION,
  payload: data
})

export const updateLocation = (survivor, location) => (dispatch) =>
  patchPerson({...survivor, lonlat: toPoint(location) })
    .then((res) =>
      dispatch(updateLocationAction(res.data))
    )

export const RETRIEVE_LOCATION = 'UPDATE_LOCATION';
export const retrieveLocationAction = (data) => ({
  type: RETRIEVE_LOCATION,
  payload: data
})

export const retrieveLocation = () => (dispatch) =>
  getLocation()
    .then((res)  =>
      dispatch(retrieveLocationAction(res.data))
    )


const UPDATE_SURVIVOR = 'UPDATE_SURVIVOR';

const updateSurvivorAction = data => ({
  type: UPDATE_SURVIVOR,
  payload: data
})

export const updateSurvivor = (survivor) => (dispatch) =>
  patchPerson(survivor)
    .then(
      res => dispatch(updateSurvivorAction(res.data))
    )

const TRADE_ITEMS_FAILED = 'TRADE_ITEMS_FAILED'
const TRADE_ITEMS = 'TRADE_ITEMS'

const tradeItemsFailed = err => ({ type: TRADE_ITEMS_FAILED, payload: err })
const tradeItems = data => ({ type: TRADE_ITEMS, payload: data })

export const offerTrade = (id, data) => dispatch =>
    postTrade(id, data)
      .then(
        res => dispatch(tradeItems(res.data)),
        err => dispatch(tradeItemsFailed(err))
      )

export const ADD_SURVIVOR = 'ADD_SURVIVOR';

export const addSurvivorAction = () => ({ type: ADD_SURVIVOR })

export const addSurvivor = (survivor) => (dispatch) =>
  postPerson(survivor)
    .then((res) => {
      dispatch(addSurvivorAction())
      signIn(res.data.id)
    });

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const signInFailedAction = (err) => ({
  type: SIGN_IN_FAILED,
  payload: err
})

export const signInAction = data => ({
  type: SIGN_IN,
  payload: data
})

export const signIn = (id) => (dispatch) =>
  getPerson(id)
    .then(
      (res) =>
        dispatch(signInAction(res.data))
    , (err) =>
        dispatch(signInFailedAction(err))
    )

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => ({ type: SIGN_OUT, payload: {} });
export const signOut = signOutAction;
