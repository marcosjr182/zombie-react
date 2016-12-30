import { combineReducers } from 'redux'
import { simpleReducer } from '../helpers'

const PER_PAGE = 12
const CHANGE_PAGE = 'CHANGE_PAGE'
const CALCULATE_PAGES = 'CALCULATE_PAGES'

export default combineReducers({
  currentPage: simpleReducer(CHANGE_PAGE, 0),
  numberOfPages: simpleReducer(CALCULATE_PAGES, 0)
})

export const calculatePagesAction = data => ({
  type: CALCULATE_PAGES,
  payload: data
})
export const changePageAction = data => ({
  type: CHANGE_PAGE,
  payload: data
})

export const changePage = changePageAction
export const calculatePages = calculatePagesAction
