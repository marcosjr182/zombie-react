import { SIGN_IN, SIGN_OUT } from './my-survivor'
import { localStorageResolver } from '../helpers'

const initialState = () =>
  (localStorage.getItem(localStorageResolver(SIGN_IN)))
    ? true
    : false

export default (state = initialState(), action) => {
  switch(action.type) {
    case SIGN_IN:
      return true
    case SIGN_OUT:
      return false
    default:
      return state;
  }
}
