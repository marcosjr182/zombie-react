import { getPeople } from '../api'
import { simpleReducer } from '../helpers'

const FETCH_SURVIVORS = 'FETCH_SURVIVORS'

export default simpleReducer(FETCH_SURVIVORS, [])

const fetchSurvivorsAction = data => ({
  type: FETCH_SURVIVORS,
  payload: data
})

export const fetchSurvivors = () => (dispatch) =>
  getPeople()
    .then((res) => dispatch(fetchSurvivorsAction(res.data)))
