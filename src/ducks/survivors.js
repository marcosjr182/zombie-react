import { simpleReducer } from '../helpers'

const FETCH_SURVIVOR_LIST_PAGE = 'FETCH_SURVIVOR_LIST_PAGE'

export default simpleReducer("FETCH_SURVIVOR_LIST_PAGE", [])

const fetchSurvivorListPageAction = data => ({
  type: FETCH_SURVIVOR_LIST_PAGE,
  payload: data
})

export const fetchSurvivorListPage = fetchSurvivorListPageAction
