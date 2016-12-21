import { parseLocation, toPoint } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         getItems, postTrade } from '../api';

const PER_PAGE = 12;

export function fetchSurvivors(){
  return function(dispatch) {
    getPeople()
      .then((res) => {
        const survivors = parseSurvivors(res.data);
        dispatch(prepareItems(survivors))
      });
  }
}

function prepareItems(list){
  return function (dispatch){
    const survivors = list.map((survivor) =>
      ({...survivor, items: prepareSurvivorItems(survivor.id) })
    )
    const numberOfPages = Math.floor(survivors.length / PER_PAGE)

    return dispatch({
      type: 'FETCH_SURVIVORS_ITEMS',
      payload: { survivors, numberOfPages }
    })
  }
}

export function setSurvivorListPage(list, page){
  return function (dispatch) {
    const startingIndex = (page-1) * 12;
    const survivors = list.slice(startingIndex, startingIndex + 12);
    dispatch({
      type: 'SET_SURVIVOR_LIST_PAGE',
      payload: { survivors, page }
    })
  }
}

function prepareSurvivorItems(id){
  let items = { Water:0, Food:0, Ammunition:0, Medication:0 };
  getItems(id)
    .then((res) =>
      res.data.map((item) => {
        items[item.item.name] = item.quantity;
      })
    )
  return items
}

export function fetchSurvivor(id){
  return function(dispatch) {
    getPerson(id)
      .then((res) => {
        dispatch({
          type: 'FETCH_SURVIVOR',
          payload: {
            ...res.data,
            lastSeen: parseLocation(res.data.lonlat),
            items: prepareSurvivorItems(res.data.id)
          }
        })
      })
  }
}

export function reportSurvivor(infected){
  return function(dispatch) {
    postReportInfection(getUser().id, infected)
      .then(() => {
        dispatch({
          type: 'REPORT_INFECTED_SURVIVOR',
          payload: {}
        });
      })
  }
}


export function addSurvivor(survivor){
  return function() {
    postPerson(survivor)
      .then(() => {
        fetchSurvivors();
      })
  }
}

export function signIn(id){
  return function(dispatch) {
    getPerson(id)
      .then((res) => {
        dispatch({
          type: 'SIGN_IN',
          payload: {
            ...res.data,
            lastSeen : parseLocation(res.data.lonlat),
            items: prepareSurvivorItems(res.data.id)
          }
        })
      });
  }
}

export function signOut(){
  return function(dispatch) {
    dispatch({
      type: 'SIGN_OUT',
      payload: {}
    });
  }
}

export function updateLocation(survivor){
  return function(dispatch) {
    getLocation()
      .then((res) => {
        patchPerson({...survivor, lonlat: toPoint(res.data.location) })
          .then((res) => {
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: res.data
            })
          })
      })
  }
}

export function updateSurvivor(survivor){
  return function(dispatch) {
    patchPerson(survivor)
      .then((res) => {
        dispatch({
          type: 'UPDATE_SURVIVOR',
          payload: res.data
        })
      })
  }
}

export function offerTrade(id, data){
  return function(dispatch) {
    postTrade(id, data)
      .then((res) => {
        dispatch({
          type: 'TRADE_ITEMS',
          payload: res.data
        })
      }, (err) => {
        dispatch({
          type: 'TRADE_ITEMS_FAILED',
          payload: err
        })
      })
  }
}
