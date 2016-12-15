import axios from 'axios';
import ENV from './env.json';

import {fetchItems} from './actions/survivor-actions';

const BASE_URL = 'http://zssn-backend-example.herokuapp.com/api',
      distanceService = new google.maps.DistanceMatrixService();

export const getPeople = () =>
  axios.get(`../api/people.json`)

export const getPerson = id =>
  axios.get(`${BASE_URL}/people/${id}.json`)

export const postReportInfection = (id, infected) =>{
  axios.post(`${BASE_URL}/people/${id}/report_infection.json`,
    { infected: infected })}

export const postPerson = survivor =>
  axios.post(`${BASE_URL}/people.json`, survivor)

export const patchPerson = survivor =>
  axios.patch(`${BASE_URL}/people/${survivor.id}.json`, updatableSurvivor(survivor))

export const getLocation = () =>
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${ENV.GMAPS_KEY}`)

export const getUser = () =>
  JSON.parse(localStorage.getItem('my-survivor'))

export const getItems = (id) =>
  axios.get(`${BASE_URL}/people/${id}/properties.json`)

export const parseSurvivors = survivors =>
  survivors.map( survivor => ({
    id: survivor.location.split('/').pop(),
    age: survivor.age,
    gender: survivor.gender,
    items: fetchItems(survivor.id),
    lastSeen: parseLocation(survivor.lonlat),
    name: survivor.name
  }))

const parseLocation = lonlat => {
  if (!lonlat) return {lat: 0, lng: 0}
  lonlat = lonlat.substring(7, lonlat.length-1).split(' ');
  return {lat: +lonlat[0], lng: +lonlat[1]}
}

const updatableSurvivor = ({age, gender, lonlat, name}) => ({
  person: { age, gender, lonlat, name }
})

/*const calculateDistance = ({
from: [fromLat, fromLng],
to: [toLat, toLng]}) => {
if (false && user && survivor.lonlat){
distanceService.getDistanceMatrix({
origins: [new google.maps.LatLng(user.lastSeen.lat, user.lastSeen.lng)],
destinations: [new google.maps.LatLng(survivor.lastSeen.lat, survivor.lastSeen.lng)],
travelMode: 'WALKING'
}, (res) => {
if (res) { // there is a survivor causing a null return from getDistanceMatrix
const data = res.rows[0].elements[0];
if (data.status == 'OK') survivor.distance = data.text;
}
});
}
}*/
