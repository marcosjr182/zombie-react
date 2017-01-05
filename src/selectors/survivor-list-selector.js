import { createSelector } from 'reselect'
import { parseLocation } from '../helpers'
import { calculateDistance } from '../selectors/survivor-selector'

const PER_PAGE = 12

export const calculatePages = (qty) =>
  Math.floor(qty / PER_PAGE) - 1

const parseSurvivors = (userLastSeen, survivors) =>
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

const getPage = ({ currentPage }) => currentPage
const getSurvivors = ({ list }) => list
const getUserLastSeen = ({ userLastSeen }) => userLastSeen

export const getSurvivorsByPage = createSelector(
  [ getSurvivors, getPage, getUserLastSeen ],
  (survivors, page, userLastSeen) => {
    const startingIndex = page * PER_PAGE
    const pageSurvivors = survivors.slice(startingIndex, startingIndex + PER_PAGE)

    return parseSurvivors(userLastSeen, pageSurvivors)
  }
)
