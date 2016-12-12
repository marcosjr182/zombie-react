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
  console.time('parseSurvivors');
  for (let i=0, size=survivors.length; i<size; i++){
    survivors[i].id = survivors[i].location.split('/').pop();
    survivors[i].lastSeen = parseLocation(survivors[i].lonlat)

    if (user && survivors[i].lonlat){
      distanceService.getDistanceMatrix({
        origins: [new google.maps.LatLng(user.lastSeen.lat, user.lastSeen.lng)],
        destinations: [new google.maps.LatLng(survivors[i].lastSeen.lat, survivors[i].lastSeen.lng)],
        travelMode: 'WALKING'
      }, (res) => {
        if (res) { // there is a survivor causing a null return from getDistanceMatrix
          const data = res.rows[0].elements[0];
          if (data.status == 'OK') survivors[i].distance = data.text;
        }
      });
    }
  }

  console.time('parseSurvivors');
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
  return function(dispatch){
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GMAPS_KEY}`)
      .then((res) => {
        survivor.lonlat = toPoint(res.data.location);
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: survivor
        })
      })
  }
}

function updatableSurvivor(survivor) {
  return {
    person: {
      age: survivor.age,
      gender: survivor.gender,
      lonlat: survivor.lonlat,
      name: survivor.name
    }
  }
}

export function updateSurvivor(survivor){
  console.log(survivor)
  return function(dispatch) {
    axios.patch(`${BASE_URL}/people/${survivor.id}.json`, updatableSurvivor(survivor))
      .then((res) => {
        dispatch({
          type: 'UPDATE_SURVIVOR',
          payload: res.data
        });
      }).catch((err) => { console.log(err) })
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
