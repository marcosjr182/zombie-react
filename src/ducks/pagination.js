import { combineReducers } from 'redux'
import { simpleReducer } from '../helpers'

const PER_PAGE = 12
const CHANGE_PAGE = 'CHANGE_PAGE'
const CALCULATE_PAGES = 'CALCULATE_PAGES'

export default combineReducers({
  currentPage: simpleReducer(CHANGE_PAGE, 0),
  numberOfPages: simpleReducer(CALCULATE_PAGES, 0)
})

const caculatePagesAction = data => ({
  type: CALCULATE_PAGES,
  payload: data
})
const changePageAction = data => ({
  type: CHANGE_PAGE,
  payload: data
})

export const calculatePages = (list) => (dispatch) =>
  dispatch(caculatePagesAction(Math.floor(list.length / PER_PAGE)-1))

export const changePage = (page) => (dispatch) =>
  dispatch(changePageAction(page))
