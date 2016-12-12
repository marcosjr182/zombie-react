import axios from 'axios';

const BASE_URL = 'http://zssn-backend-example.herokuapp.com/api',
      GMAPS_KEY = 'AIzaSyARE73-iFHwZPItMafq-kl_gtIDqnzvWt0',
      distanceService = new google.maps.DistanceMatrixService();

export function fetchSurvivors(){
  return function(dispatch) {
    axios.get(`${BASE_URL}/people.json`)
      .then((res) => {
        dispatch({
           type: 'FETCH_SURVIVORS',
           payload: parseSurvivors(res.data)
        })
      });
  }
}

function parseSurvivors(survivors){
  const user = JSON.parse(localStorage.getItem('my-survivor'));

  for (let i=0, size=survivors.length; i<size; i++){
    survivors[i].id = survivors[i].location.split('/').pop();
    survivors[i].lastSeen = parseLocation(survivors[i].lonlat)

    if (user){
      distanceService.getDistanceMatrix({
        origins: [new google.maps.LatLng(user.lastSeen.lat, user.lastSeen.lng)],
        destinations: [new google.maps.LatLng(survivors[i].lastSeen.lat, survivors[i].lastSeen.lng)],
        travelMode: 'WALKING'
      }, (res) => {
        if (data.status == 'OK')
          survivors[i].distance = res.rows[0].elements[0].text;
      });
    }
  }

  return survivors;
}

export function fetchSurvivor(id){
  return function(dispatch) {
    axios.get(`${BASE_URL}/people/${id}.json`)
      .then((res) => {
        res.data.lastSeen = parseLocation(res.data.lonlat)
        dispatch({
          type: 'FETCH_SURVIVOR',
          payload: res.data
        })
      })
  }
}

export function reportSurvivor(id, infected){
  return function(dispatch) {
    axios.post(`${BASE_URL}/people/${id}/report_infection.json`, { infected: infected })
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
    axios.post(`${BASE_URL}/people.json`, survivor)
      .then(() => {
        fetchSurvivors();
      })
  }
}

export function signIn(id){
  return function(dispatch) {
    axios.get(`${BASE_URL}/people/${id}.json`)
      .then((res)=>{
        res.data.lastSeen = parseLocation(res.data.lonlat);
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
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GMAPS_KEY}`)
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
    axios.patch(`${BASE_URL}/people/${request.id}.json`, request.data)
      .then((res) => {
        dispatch({
          type: 'UPDATE_SURVIVOR',
          payload: res.data
        });
      })
  }
}

export function parseLocation(lonlat){
  if (!lonlat) return {lat: 0, lng: 0}

  lonlat = lonlat.substring(7, lonlat.length-1).split(' ');
  return { lat: +lonlat[0], lng: +lonlat[1] }
}

export function toPoint(location){
  return `POINT (${location.lat} ${location.lng})`
}
