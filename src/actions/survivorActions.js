import axios from 'axios';

export function fetchSurvivors(){
	return function(dispatch) {
		axios.get('../../api/people.json')
			.then((res) => {
				dispatch({ 
					type: 'FETCH_SURVIVORS',
					payload: res.data
				});
			});
	}
}

