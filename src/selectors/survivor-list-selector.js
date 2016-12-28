import { createSelector } from 'reselect'

const PER_PAGE = 12
//
// const hasThisId = id => item =>
//   item.id === id
//
// const getById = (list, id) =>
//   list.find(hasThisId(id))
//
// const getSurvivorById = (store, id) =>
//   getById(store.survivors.raw.survivors, id)


const getSurvivors = (store) => store.survivors.raw.survivors
const getPage = (store) => store.survivors.pagination.currentPage

export const getSurvivorsByPage = createSelector(
  [ getSurvivors, getPage ],
  (survivors, page) => {
    const startingIndex = page * PER_PAGE
    return survivors.slice(startingIndex, startingIndex + PER_PAGE)
  }
)
