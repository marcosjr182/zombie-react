export default function reducer (
	state = {
		survivors: [],
		mySurvivor: {},
		status: true
	},
	action) {

		switch (action.type) {
			case "FETCH_SURVIVORS": {
				return { ...state, survivors: action.payload }
			}
			default:
				return state;
		}

}
