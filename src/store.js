import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { throttle } from 'lodash'
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

store.subscribe(throttle(() => {
  saveState(
    localStorageResolver('SIGN_IN'),
    store.getState().survivors.mySurvivor
  )
}, 1000))

export default store
