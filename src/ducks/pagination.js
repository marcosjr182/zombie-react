import { combineReducers } from 'redux'
import { simpleReducer } from '../helpers'

const CHANGE_PAGE = 'CHANGE_PAGE'
const PAGES_QTY = 'PAGES_QTY'

export default combineReducers({
  currentPage: simpleReducer(CHANGE_PAGE, 0),
  numberOfPages: simpleReducer(PAGES_QTY, 0)
})

export const pagesQtyAction = data => ({
  type: PAGES_QTY,
  payload: data
})
export const changePageAction = data => ({
  type: CHANGE_PAGE,
  payload: data
})

export const changePage = changePageAction
export const pagesQty = pagesQtyAction
