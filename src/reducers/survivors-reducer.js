export default function reducer (
	state = {
		survivors: [],
		survivor: {}
	},
	action) {

		switch (action.type) {
			case "FETCH_SURVIVORS": {
				return { ...state, survivors: action.payload }
			}
			case "FETCH_SURVIVOR": {
				return { ...state, survivor: action.payload }
			}
			default:
				return state;
		}

}
