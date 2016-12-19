import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = applyMiddleware(thunk, logger());

export default createStore(reducer, composeWithDevTools(middleware));
