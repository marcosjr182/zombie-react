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
  (survivors, id) =>
    parseSurvivor(getById(survivors, id))
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
