import { getPerson, postPerson, patchPerson } from '../api'
import { TRADE_ITEMS } from './survivor'

const UPDATE_USER = 'UPDATE_USER'
const ADD_SURVIVOR = 'ADD_SURVIVOR'
const SIGN_OUT = 'SIGN_OUT'
const SIGN_IN = 'SIGN_IN'
const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export default (state = {}, action) => {
  if ([
      ADD_SURVIVOR,
      UPDATE_USER,
      SIGN_IN,
      SIGN_OUT].includes(action.type)) {
      return action.payload
  }

  if(action.payload === TRADE_ITEMS) {
    return action.payload.mySurvivor
  }

  return state
}

const updateUserAction = data => ({
  type: UPDATE_USER,
  payload: data
})
const signInFailedAction = err => ({
  type: SIGN_IN_FAILED,
  payload: err
})
const signInAction = data => ({
  type: SIGN_IN,
  payload: data
})
const addSurvivorAction = data => ({
  type: ADD_SURVIVOR,
  payload: data
})
const signOutAction = () => ({
  type: SIGN_OUT,
  payload: {}
})

export const signOut = signOutAction;

export const updateUser = (survivor) => (dispatch) =>
  patchPerson(survivor)
    .then((res) => dispatch(updateUserAction(res.data)))

export const addSurvivor = (survivor) => (dispatch) =>
  postPerson(survivor)
    .then(() => dispatch(addSurvivorAction()))

export const signIn = (id) => (dispatch) =>
  getPerson(id)
    .then(
      (res) => dispatch(signInAction(res.data)),
      (err) => dispatch(signInFailedAction(err))
    )
