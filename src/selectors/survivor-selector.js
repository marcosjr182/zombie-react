import { createSelector } from 'reselect'
import { parseLocation } from '../helpers'

const hasThisId = id => item =>
  item.id === id

const getById = (list, id) =>
  list.find(hasThisId(id))

export const parseSurvivor = (survivor) => {

  survivor.lastSeen = parseLocation(survivor.lonlat)
  return survivor
}

const getId = (_, id) => id
const getSurvivors = (state) => state.survivors

export const getSurvivorById = createSelector(
  [ getSurvivors, getId ],
  (survivors, id) => {
    const survivor = getById(survivors, id)
    return (survivor)
      ? parseSurvivor(survivor)
      : undefined
  }
)

const reduceItems = (raw) =>
  raw.reduce((result, item) => {
    return { ...result, [item.item.name]: item.quantity }
  }, {})

export const parseItems = (raw) => {
  const initial = { Water:0, Food:0, Ammunition:0, Medication:0 }
  return (raw === undefined)
    ? initial
    : { ...initial, ...reduceItems(raw) }
}

export const updatableSurvivor = ({age, gender, lonlat, name}) => ({
  person: { age, gender, lonlat, name }
})

export const calculateDistance = (origin, destination) => {
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
