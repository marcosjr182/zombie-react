import axios from 'axios';

const BASE_URL = 'http://zssn-backend-example.herokuapp.com/api/';

export function fetchSurvivors(){
  return function(dispatch) {
   axios.get('../../api/people.json')
     .then((res) => {
      dispatch({
        type: 'FETCH_SURVIVORS',
        payload: res.data
      })
     });
  }
}

export function fetchSurvivor(id){
  return function(dispatch) {
   axios.get(`${BASE_URL}/people/${id}.json`)
     .then((res) => {
        res.data.place = parseLocation(res.data.lonlat)
        dispatch({
          type: 'FETCH_SURVIVOR',
          payload: res.data
        })
     })
  }
}

export function reportSurvivor(id, infected){
  return function(dispatch) {
   axios.post(`http://zssn-backend-example.herokuapp.com/api/people/${id}/report_infection.json`, { infected: infected })
     .then(() => {
      dispatch({
        type: 'REPORT_INFECTED_SURVIVOR',
        payload: {}
      });
     });
  }
}


export function addSurvivor(survivor){
  return function() {
   axios.post('http://zssn-backend-example.herokuapp.com/api/people.json', survivor)
     .then(()=>{
      fetchSurvivors();
     })
  }
}

export function signIn(id){
  return function(dispatch) {
   axios.get(`http://zssn-backend-example.herokuapp.com/api/people/${id}.json`)
     .then((res)=>{
       dispatch({
          type: 'SIGN_IN',
          payload: res.data
        })
     });
  }
}

export function signOut(){
  return function(dispatch) {
   dispatch({
      type: 'SIGN_OUT',
      payload: {}
    });
  }
}


export function fetchLocation(survivor){
  return function(){
    axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyARE73-iFHwZPItMafq-kl_gtIDqnzvWt0')
      .then((res) => {
        updateSurvivor({
          id: survivor.id,
           data: {
             person: {
               lonlat: toPoint(res.data.location),
               name: survivor.name,
               gender: survivor.gender,
               age: survivor.age
             }
          }
        })
      });
  }
}

export function updateSurvivor(request){
  return function(dispatch) {
   axios.patch(`http://zssn-backend-example.herokuapp.com/api/people/${request.id}.json`, request.data)
     .then((res) => {
        dispatch({
        type: 'UPDATE_SURVIVOR',
        payload: res.data
      });
     }).catch((err) => {
        console.error(err);
      });
  }
}


export function parseLocation(lonlat){
  lonlat = lonlat.substring(7, lonlat.length-1).split(' ');
  return { lat: +lonlat[0], lng: +lonlat[1] }
}

export function toPoint(location){
  return `POINT (${location.lat} ${location.lng})`
}
