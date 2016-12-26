import { parseLocation, toPoint } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         getItems, postTrade } from '../api';

const PER_PAGE = 12;

const parseSurvivor = (survivor) =>
  ({ ...survivor, lastSeen: parseLocation(survivor.lonlat) })

const fetchItemsAndDispatch = (survivor, type) => (dispatch) =>
  parseItems(survivor.id)
    .then( items => dispatch({ type, payload: {...survivor, items: items }}) );

export const FETCH_SURVIVORS = 'FETCH_SURVIVORS';

const fetchSurvivorsAction = (survivors, numberOfPages) => ({
  type: FETCH_SURVIVORS,
  payload: { survivors, numberOfPages }
})

export const fetchSurvivors = () => (dispatch) =>
  getPeople()
    .then((res) => {
      console.log(res)
      const survivors = parseSurvivors(res.data),
            numberOfPages = Math.floor(survivors.length / PER_PAGE) - 1;

      dispatch(fetchSurvivorsAction(survivors, numberOfPages))
    });

export const ADD_TO_SURVIVOR_LIST_PAGE = 'ADD_TO_SURVIVOR_LIST_PAGE';

const fetchItems = (list) => (dispatch) =>
  list.map((survivor) =>
    dispatch(fetchItemsAndDispatch(survivor, ADD_TO_SURVIVOR_LIST_PAGE))
  );

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
export const fetchSurvivor = (id) => (dispatch) =>
  getPerson(id)
    .then((res) => {
      const survivor = parseSurvivor(res.data)
      dispatch(fetchItemsAndDispatch(survivor, FETCH_SURVIVOR))
    });

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

const reportInfectedSurviorAction = () => ({
  type: REPORT_INFECTED_SURVIVOR,
  payload: {}
})

const reportInfectedSurviorActionFailed = () =>
  ({ type: REPORT_FAILED })

export const reportSurvivor = (infected) => (dispatch) =>
  postReportInfection(getUser().id, infected)
    .then(
      () => dispatch(reportInfectedSurviorAction()),
      () => dispatch(reportInfectedSurviorActionFailed())
    )


export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const updateLocation = (survivor) => (dispatch) =>
  getLocation()
    .then((res) =>
      patchPerson({...survivor, lonlat: toPoint(res.data.location) })
        .then((res) => {
          const survivor = parseSurvivor(res.data)
          dispatch(fetchItemsAndDispatch(survivor, UPDATE_LOCATION))
        })
    );

const UPDATE_SURVIVOR = 'UPDATE_SURVIVOR';

const updateSurvivorAction = data => ({ type: UPDATE_SURVIVOR, payload: data })

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

const addSurvivorAction = () => ({ type: ADD_SURVIVOR })

export const addSurvivor = (survivor) => (dispatch) =>
  postPerson(survivor)
    .then(() => {
      dispatch(addSurvivorAction())
      signIn(res.data.id)
    });

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const signInFailedAction = () => ({ type: SIGN_IN_FAILED })

export const signIn = (id) => (dispatch) =>
  getPerson(id)
    .then((res) => {
      const survivor = parseSurvivor(res.data);
      dispatch(fetchItemsAndDispatch(survivor, SIGN_IN))
    }, () => dispatch(signInFailedAction())
  )

export const SIGN_OUT = SIGN_OUT;
export const signOutAction = () => ({ type: SIGN_OUT, payload: {} });
export const signOut = signOutAction;
