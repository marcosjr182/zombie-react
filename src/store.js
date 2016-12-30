import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { localStorageResolver } from './helpers'

import reducer from './reducers'

export const localstorageMiddleware = localStorageResolver => store => next => action => {
  const cacheKey = localStorageResolver(action.type)

  cacheKey && localStorage.setItem(cacheKey, JSON.stringify(action.payload))

  return next(action)
}

const middleware = applyMiddleware(
  thunk,
  localstorageMiddleware(localStorageResolver),
  logger()
)

export default createStore(reducer, composeWithDevTools(middleware))
