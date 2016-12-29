import { combineReducers } from 'redux'

import survivor from '../ducks/survivor'
import survivors from '../ducks/survivors'
import items from '../ducks/items'
import pagination from '../ducks/pagination'
import raw from '../ducks/raw'
import mySurvivor, { SIGN_IN, SIGN_OUT } from '../ducks/my-survivor'

const isSigned = (state = false, action) => {
  switch(action.type) {
    case SIGN_IN:
      return true
    case SIGN_OUT:
      return false
    default:
      return state;
  }
}

export default combineReducers({
  survivors,
  items,
  survivor,
  pagination,
  raw,
  mySurvivor,
  isSigned,
})
