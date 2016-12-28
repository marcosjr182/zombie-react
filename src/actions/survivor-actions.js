import { parseLocation, toPoint } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         getItems, postTrade } from '../api';

const PER_PAGE = 12;

const parseSurvivor = (survivor) =>
  ({ ...survivor, lastSeen: parseLocation(survivor.lonlat) })

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const fetchItemsAction = (survivorId, items) => ({
  type: FETCH_ITEMS,
  payload: { survivorId, items}
})

export const fetchItems = (survivorId) => (dispatch) =>
  parseItems(survivorId)
    .then( (items) =>
      dispatch(fetchItemsAction(survivorId, items))
    )

// export const FETCH_SURVIVOR_LIST_PAGE = 'FETCH_SURVIVOR_LIST_PAGE';
//
// export const fetchSurvivorListPageAction = data => ({
//   type: FETCH_SURVIVOR_LIST_PAGE,
//   payload: data
// })
//
// export const fetchSurvivorListPageAction = () => (dispatch) =>
//   fetchSurvivorListPage(res.data)


export const FETCH_SURVIVORS = 'FETCH_SURVIVORS';
export const fetchSurvivorsAction = data => ({
  type: FETCH_SURVIVORS,
  payload: data
})

export const fetchSurvivors = () => (dispatch) =>
  getPeople()
    .then((res) => dispatch(fetchSurvivorsAction(res.data)))

export const CALCULATE_PAGES = 'CALCULATE_PAGES';
export const caculatePagesAction = data => ({
  type: CALCULATE_PAGES,
  payload: data
})

export const calculatePages = () =>
  caculatePagesAction( Math.floor(survivors.length / PER_PAGE)-1 )



export const ADD_TO_SURVIVOR_LIST_PAGE = 'ADD_TO_SURVIVOR_LIST_PAGE';

export const PREPARE_SURVIVOR_LIST_PAGE = 'PREPARE_SURVIVOR_LIST_PAGE';

const prepareSurvivorListPageAction = () => ({
  type: PREPARE_SURVIVOR_LIST_PAGE,
  payload: []
})

export const prepareSurvivorListPage = (list, page) => (dispatch) => {
  const startingIndex = (page) * 12,
        survivors = list.slice(startingIndex, startingIndex + 12);

  dispatch(prepareSurvivorListPageAction())
  dispatch(fetchItems(survivors))
};

export const FETCH_SURVIVOR = 'FETCH_SURVIVOR';

export const fetchSurvivorAction = data => ({
  type: FETCH_SURVIVOR,
  payload: data
})

export const fetchSurvivor = (id) => (dispatch) =>
  getPerson(id)
    .then((res) => dispatch(fetchSurvivorAction(res.data)));

const parseItems = (id) =>
  getItems(id)
    .then((res) =>
      res.data.reduce((result, item) => {
        return { ...result, [item.item.name]: item.quantity }
      }, {})
    ).then((items) => {
      const initial = { Water:0, Food:0, Ammunition:0, Medication:0 };
      return { ...initial, ...items  }
    });

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

export const SIGN_OUT = SIGN_OUT;
export const signOutAction = () => ({ type: SIGN_OUT, payload: {} });
export const signOut = signOutAction;
