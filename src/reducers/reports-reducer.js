export default function reducer (
	state = {
		reports: [],
		reports_list:[]
	},
	action) {
		switch (action.type) {
			case "FETCH_REPORTS_LIST": {
				return { ...state, reports_list: action.payload }
			}
		}

}
