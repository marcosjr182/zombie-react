export default function reducer (
	state = {
		reports: [],
		list:{}
	},
	action) {
		switch (action.type) {
			case "FETCH_REPORTS": {
				return { ...state, list: action.payload }
			}
			default:
				return state;
		}

}
