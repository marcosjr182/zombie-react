import { simpleReducer } from '../helpers'
import { resetItems } from './items'

const FETCH_SURVIVOR_LIST_PAGE = 'FETCH_SURVIVOR_LIST_PAGE'

export default simpleReducer("FETCH_SURVIVOR_LIST_PAGE", [])

export const fetchSurvivorListPageAction = data => ({
  type: FETCH_SURVIVOR_LIST_PAGE,
  payload: data
})

export const fetchSurvivorListPage = (data) => (dispatch) =>
  Promise.resolve(dispatch(resetItems()))
    .then(() => dispatch(fetchSurvivorListPageAction(data)))
