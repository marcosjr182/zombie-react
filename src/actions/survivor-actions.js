import { parseLocation } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         fetchItems } from '../api';

export function fetchSurvivors(){
  return function(dispatch) {
    getPeople()
      .then((res) => {
        dispatch({
           type: 'FETCH_SURVIVORS',
           payload: parseSurvivors(res.data)
        })
      });
  }
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
            items: fetchItems(res.data.id)
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
            items: fetchItems(res.data.id)
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

export function offerTrade(data){
  return function(dispatch) {
    postTrade(data)
      .then((res) => {
        dispatch({
          type: 'TRADE_ITEMS',
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: 'TRADE_ITEMS_FAILED',
          payload: {}
        })
      })
  }
}
