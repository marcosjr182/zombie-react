export default function reducer (
	state = {
		reports: [],
		list:[]
	},
	action) {
		switch (action.type) {
			case "FETCH_REPORT_LIST":
				return { ...state, list: action.payload }
      case "FETCH_REPORT":
        return {
          ...state,
          reports: [...state.reports, action.payload]
        }
	    default:
				return state;
		}

}
