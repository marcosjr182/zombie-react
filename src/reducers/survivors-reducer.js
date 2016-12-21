export default function reducer (
  state = {
    survivors: [],
    survivor: {},
    pagination: { numberOfPages: 0, currentPage: 1 },
    raw: { survivors: [] },
    mySurvivor: JSON.parse(localStorage.getItem('my-survivor')) || {},
    isSigned: (localStorage.getItem('my-survivor') != null)
  },
  action) {

  switch (action.type) {
    case "FETCH_SURVIVORS":
      return { ...state }
    case "FETCH_SURVIVORS_ITEMS":
      return {
        ...state,
        raw: {...state.raw, survivors: action.payload.survivors },
        pagination: {
          ...state.pagination,
          numberOfPages: action.payload.numberOfPages
        }
      }
    case "SET_SURVIVOR_LIST_PAGE":
      return {
        ...state,
        survivors: action.payload.survivors
      }
    case "FETCH_SURVIVOR":
      return { ...state, survivor: action.payload }
    case "UPDATE_SURVIVOR":
      return { ...state, mySurvivor: action.payload }
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
