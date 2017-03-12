import { loadState } from '../localStorage'
import { localStorageResolver } from '../helpers'
import { getPerson, postPerson, patchPerson } from '../api'
import { TRADE_ITEMS } from './survivor'

export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_IN = 'SIGN_IN'

const UPDATE_USER = 'UPDATE_USER'
const ADD_SURVIVOR = 'ADD_SURVIVOR'
const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

const preloadedState = loadState(localStorageResolver(SIGN_IN))

export default (state = preloadedState || {}, action) => {
  switch (action.type) {
    case ADD_SURVIVOR:
    case UPDATE_USER:
    case SIGN_IN:
    case SIGN_OUT:
      return action.payload
    case TRADE_ITEMS:
      return action.payload.mySurvivor
    default:
      return state
  }
}

export const updateUserAction = data => ({
  type: UPDATE_USER,
  payload: data
})
export const signInFailedAction = err => ({
  type: SIGN_IN_FAILED,
  payload: err
})
export const signInAction = data => ({
  type: SIGN_IN,
  payload: data
})
export const addSurvivorAction = data => ({
  type: ADD_SURVIVOR,
  payload: data
})
export const signOutAction = () => ({
  type: SIGN_OUT,
  payload: {}
})

export const signOut = signOutAction

export const updateUser = (survivor) => (dispatch) =>
  patchPerson(survivor)
    .then((res) => dispatch(updateUserAction(res.data)))

export const addSurvivor = (survivor) => (dispatch) =>
  postPerson(survivor)
    .then(() => dispatch(addSurvivorAction(survivor)))

export const signIn = (id) => (dispatch) =>
  getPerson(id)
    .then(
      (res) => dispatch(signInAction(res.data)),
      (err) => dispatch(signInFailedAction(err))
    )
