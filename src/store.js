import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { localStorageResolver } from './helpers'
import { saveState } from './localStorage'

import reducer from './reducers'

const middleware = applyMiddleware(
  thunk,
  logger()
)

const store = createStore(reducer, composeWithDevTools(middleware))

store.subscribe(() => {
  saveState(
    localStorageResolver('SIGN_IN'),
    store.getState().survivors.mySurvivor
  )
})

export default store
