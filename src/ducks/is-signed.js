import { SIGN_IN, SIGN_OUT, preloadedState as user } from './my-survivor'

const preloadedState = (user === undefined) ? false : true

export default (state = preloadedState, action) => {
  switch(action.type) {
    case SIGN_IN:
      return true
    case SIGN_OUT:
      return false
    default:
      return state;
  }
}
