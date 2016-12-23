import { parseLocation, toPoint } from '../helpers';
import { getPeople, getPerson, postPerson,
         postReportInfection, patchPerson,
         parseSurvivors, getLocation, getUser,
         getItems, postTrade } from '../api';

const PER_PAGE = 12;

export const fetchSurvivors = () =>
  (dispatch) =>
    getPeople()
      .then((res) => {
        const survivors = parseSurvivors(res.data),
              numberOfPages = Math.floor(survivors.length / PER_PAGE) - 1;

        dispatch({
          type: 'FETCH_SURVIVORS',
          payload: { survivors, numberOfPages }
        })
      });

const fetchItems = (list) =>
  (dispatch) =>
    list.map((survivor) =>
      dispatch(
        fetchItemsAndDispatch(survivor, 'ADD_TO_SURVIVOR_LIST_PAGE')
      )
    );

export const prepareSurvivorListPage = (list, page) =>
  (dispatch) => {
    const startingIndex = (page) * 12,
          survivors = list.slice(startingIndex, startingIndex + 12);

    dispatch({
      type: 'PREPARE_SURVIVOR_LIST_PAGE',
      payload: []
    })
    dispatch(fetchItems(survivors))
  };

export const fetchSurvivor = (id) =>
  (dispatch) =>
    getPerson(id)
      .then((res) => {
        const survivor = {
          ...res.data,
          lastSeen: parseLocation(res.data.lonlat)
        }
        dispatch(
          fetchItemsAndDispatch(survivor, 'FETCH_SURVIVOR')
        )
      }
    );

const parseItems = (id) =>
  getItems(id)
    .then((res) =>
      res.data.reduce((result, item) => {
        return {
          ...result,
          [item.item.name]: item.quantity
        }
      }, {})
    ).then((items) => {
      const initial = { Water:0, Food:0, Ammunition:0, Medication:0 };
      return { ...initial, ...items  }
    });

const fetchItemsAndDispatch = (survivor, type) =>
  (dispatch) => {
    parseItems(survivor.id)
    .then((items) =>
      dispatch({
        type,
        payload: {...survivor, items: items }
      })
    )
  }

export const reportSurvivor = (infected) =>
  (dispatch) =>
    postReportInfection(getUser().id, infected)
      .then(() => {
        dispatch({
          type: 'REPORT_INFECTED_SURVIVOR',
          payload: {}
        });
      },
      () => {
        dispatch({
          type: 'REPORT_FAILED'
        })
      });

export const addSurvivor = (survivor) =>
  (dispatch) =>
    postPerson(survivor)
      .then(() => {
        dispatch({
          type: 'ADD_SURVIVOR'
        })
        fetchSurvivors()
      });

export const signIn = (id) =>
  (dispatch) =>
    getPerson(id)
      .then((res) =>
        dispatch(
          fetchItemsAndDispatch({
            ...res.data,
            lastSeen : parseLocation(res.data.lonlat),
          }, 'SIGN_IN')
        )
      )

export const signOut = () =>
  (dispatch) => {
    dispatch({
      type: 'SIGN_OUT',
      payload: {}
    })
  };

export const updateLocation = (survivor) =>
  (dispatch) =>
    getLocation()
      .then((res) =>
        patchPerson({...survivor, lonlat: toPoint(res.data.location) })
          .then((res) =>
            dispatch(
              fetchItemsAndDispatch({
                ...res.data,
                lastSeen: parseLocation(res.data.lonlat)
              }, 'UPDATE_LOCATION')
            )
          )
      );

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
