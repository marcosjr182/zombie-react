import { getItems } from '../api'

const FETCH_ITEMS = 'FETCH_ITEMS'
const RESET_ITEMS = 'RESET_ITEMS'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        [action.payload.survivorId]: action.payload.items
      }
    case RESET_ITEMS:
      return action.payload;
    default:
      return state;
  }
}

export const fetchItemsAction = (survivorId, items) => ({
  type: FETCH_ITEMS,
  payload: { survivorId, items }
})
export const resetItemsAction = () => ({
  type: RESET_ITEMS,
  payload: {}
})

export const resetItems = resetItemsAction
export const fetchItems = (survivorId) => (dispatch) =>
  getItems(survivorId)
    .then((res) =>
      dispatch(fetchItemsAction(survivorId, res.data))
    )
