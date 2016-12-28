export default function reducer (
  state = {
    survivors: [],
    items: [],
    survivor: {},
    pagination: { numberOfPages: 0, currentPage: 0 },
    raw: [],
    mySurvivor: JSON.parse(localStorage.getItem('my-survivor')) || {},
    isSigned: (localStorage.getItem('my-survivor') != null)
  },
  action) {

  switch (action.type) {
    case "FETCH_SURVIVORS":
      return { ...state, raw: action.payload }
    case "CALCULATE_PAGES":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          numberOfPages: action.payload
        }
      }
    case 'FETCH_SURVIVOR_LIST_PAGE':
      return { ...state, survivors: action.payload }
    case "FETCH_SURVIVOR":
      return { ...state, survivor: action.payload }
    case "FETCH_ITEMS":
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.survivorId]: action.payload.items
        }
      }
    case "UPDATE_SURVIVOR":
      return { ...state, mySurvivor: action.payload }
    case "RESET_ITEMS":
      return { ...state, items: action.payload }
    case "UPDATE_LOCATION":
      localStorage.setItem('my-survivor', JSON.stringify(action.payload));
      return { ...state, mySurvivor: action.payload }
    case "SIGN_IN":
      localStorage.setItem('my-survivor', JSON.stringify(action.payload));
      return { ...state, mySurvivor: action.payload, isSigned: true }
    case "SIGN_OUT":
      localStorage.removeItem('my-survivor');
      return { ...state, mySurvivor: action.payload, isSigned: false }
    case "TRADE_ITEMS":
      return {
        ...state,
        survivor: action.payload.survivor,
        mySurvivor: action.payload.mySurvivor
      }
    case "TRADE_ITEMS_FAILED":
      return { ...state }
    case "GO_TO_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload
        }
      }
    default:
      return state;
  }
}
