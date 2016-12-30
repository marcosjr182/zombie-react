import { combineReducers } from 'redux'

import isSigned from '../ducks/is-signed'
import items from '../ducks/items'
import mySurvivor from '../ducks/my-survivor'
import pagination from '../ducks/pagination'
import raw from '../ducks/raw'
import survivor from '../ducks/survivor'
import survivors from '../ducks/survivors'

export default combineReducers({
  isSigned,
  items,
  mySurvivor,
  pagination,
  raw,
  survivor,
  survivors
})
