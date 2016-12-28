export default function reducer (
  state = {
    survivors: [],
    survivor: {},
    pagination: { numberOfPages: 0, currentPage: 0 },
    raw: { survivors: [] },
    mySurvivor: JSON.parse(localStorage.getItem('my-survivor')) || {},
    isSigned: (localStorage.getItem('my-survivor') != null)
  },
  action) {

  switch (action.type) {
    case "FETCH_SURVIVORS":
      return {
        ...state,
        raw: {...state.raw, survivors: action.payload }
      }
    case "CALCULATE_NUMBER_OF_PAGES":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          numberOfPages: action.payload
        }
      }
    case "FETCH_SURVIVORS_ITEMS":
      return {
        ...state,
        raw: {...state.raw, survivors: action.payload.survivors },
      }
    case 'PREPARE_SURVIVOR_LIST_PAGE':
      return {
        ...state,
        survivors: []
      }
    case "ADD_TO_SURVIVOR_LIST_PAGE":
      return {
        ...state,
        survivors: [...state.survivors, action.payload]
      }
    case "FETCH_SURVIVOR":
      return {
        ...state,
        survivors: {...state.survivors, [action.payload.id]: action.payload } }
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
