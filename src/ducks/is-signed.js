import { loadState } from '../localStorage'
import { localStorageResolver } from '../helpers'
import { SIGN_IN, SIGN_OUT } from './my-survivor'

const preloadedState = (loadState(localStorageResolver(SIGN_IN)) !== undefined)

export default (state = preloadedState, action) => {
  switch(action.type) {
    case SIGN_IN:
      return true
    case SIGN_OUT:
      return false
    default:
      return state
  }
}
