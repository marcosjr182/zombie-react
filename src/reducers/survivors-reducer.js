export default function reducer (
	state = {
		survivors: [],
		survivor: {},
    mySurvivor: JSON.parse(localStorage.getItem('my-survivor')) || {},
    isSigned: (localStorage.getItem('my-survivor') != null)
	},
	action) {

		switch (action.type) {
			case "FETCH_SURVIVORS": {
				return { ...state, survivors: action.payload }
			}
			case "FETCH_SURVIVOR": {
				return { ...state, survivor: action.payload }
			}
      case "UPDATE_SURVIVOR": {
				return { ...state, mySurvivor: action.payload }
			}
      case "UPDATE_LOCATION": {
				return { ...state, mySurvivor: action.payload }
			}
      case "SIGN_IN": {
        localStorage.setItem('my-survivor', JSON.stringify(action.payload));
				return { ...state, mySurvivor: action.payload, isSigned: true }
			}
      case "SIGN_OUT": {
        localStorage.removeItem('my-survivor');
				return { ...state, mySurvivor: action.payload, isSigned: false }
			}
			default:
				return state;
		}

}
