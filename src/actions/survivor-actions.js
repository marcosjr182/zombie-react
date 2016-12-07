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

export function fetchSurvivor(id){
	return function(dispatch) {
		axios.get('../../api/people/'+id+'.json')
			.then((res) => {
				dispatch({ 
					type: 'FETCH_SURVIVOR',
					payload: res.data
				});
			});
	}
}

export function reportSurvivor(my_id, infected_id){
	return function(dispatch) {
		axios.post('../../api/people/'+id+'/report_infection.json', { infected: infected_id, id: my_id })
			.then((res) => {
				dispatch({ 
					type: 'REPORT_INFECTED_SURVIVOR',
					payload: res.data
				});
			});
	}
}

export function reportSurvivor(my_id, infected_id){
	return function(dispatch) {
		axios.post('../../api/people/'+id+'/report_infection.json', { infected: infected_id, id: my_id })
			.then((res) => {
				dispatch({ 
					type: 'REPORT_INFECTED_SURVIVOR',
					payload: res.data
				});
			});
	}
}

export function updateSurvivor(survivor){
	return function(dispatch) {
		axios.patch('../../api/people/'+survivor.id+'.json', 
			{ name: survivor.name,
			  lonlat: survivor.lonlat,
			  age: survivor.age,
			  gender: survivor.gender })
			.then((res) => {
				dispatch({ 
					type: 'UPDATE_SURVIVOR',
					payload: res.data
				});
			});
	}
}


