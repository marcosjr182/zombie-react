import axios from 'axios';
import { updatableSurvivor, parseLocation } from './helpers'
import ENV from './env.json';

export const GET_LOCATION_URL = `https://www.googleapis.com/geolocation/v1/geolocate?key=${ENV.GMAPS_KEY}`;

export const getPeople = () =>
  axios.get(`${ENV.BASE_URL}/people.json`)

export const getPerson = id =>
  axios.get(`${ENV.BASE_URL}/people/${id}.json`)

export const postReportInfection = (id, infected) =>
  axios.post(`${ENV.BASE_URL}/people/${id}/report_infection.json`,
    { infected: infected })

export const postPerson = survivor =>
  axios.post(`${ENV.BASE_URL}/people.json`, survivor)

export const patchPerson = survivor =>
  axios.patch(`${ENV.BASE_URL}/people/${survivor.id}.json`, updatableSurvivor(survivor))

export const getLocation = () =>
  axios.post(GET_LOCATION_URL)

export const getUser = () =>
  JSON.parse(localStorage.getItem('my-survivor'))

export const getItems = (id) =>
  axios.get(`${ENV.BASE_URL}/people/${id}/properties.json`)

export const getReportList = () =>
  axios.get(`${ENV.BASE_URL}/report.json`)

export const getReport = (location) =>
  axios.get(location)

export const postTrade = (id, trade) =>
  axios.post(`${ENV.BASE_URL}/people/${id}/properties/trade_item.json`, trade)

export const parseSurvivors = (userLastSeen, survivors) =>
  survivors.map( survivor => {
    const lastSeen = parseLocation(survivor.lonlat)
      || { lat: 0, lng: 0 }

    const distance = userLastSeen
      ? calculateDistance(lastSeen, userLastSeen)
      : '';

    return {
      age: survivor.age,
      distance: distance,
      gender: survivor.gender,
      id: survivor.location.split('/').pop(),
      lastSeen: lastSeen,
      name: survivor.name
    }
  });

const calculateDistance = (origin, destination) => {
    const radOriginLat = Math.PI * origin.lat/180,
          radDestinationLat = Math.PI * destination.lat/180,
          radTheta = Math.PI * (origin.lng - destination.lng)/180;

    let dist = Math.sin(radOriginLat)
             * Math.sin(radDestinationLat)
             + Math.cos(radOriginLat)
             * Math.cos(radDestinationLat)
             * Math.cos(radTheta);

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist.toFixed(0);
}

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
