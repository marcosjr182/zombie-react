import { getPerson, postTrade } from '../api'

export const TRADE_ITEMS = 'TRADE_ITEMS'
const FETCH_SURVIVOR = 'FETCH_SURVIVOR'

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_SURVIVOR:
      return action.payload
    case TRADE_ITEMS:
      return action.payload.survivor
    default:
      return state
  }
}

const tradeItemsAction = data => ({
  type: TRADE_ITEMS,
  payload: data
})
const fetchSurvivorAction = data => ({
  type: FETCH_SURVIVOR,
  payload: data
})

export const fetchSurvivor = (id) => (dispatch) =>
  getPerson(id)
    .then((res) => dispatch(fetchSurvivorAction(res.data)))


export const offerTrade = (id, data) => dispatch =>
  postTrade(id, data)
    .then((res) => dispatch(tradeItemsAction(res.data)))
