import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import survivors from './survivors-reducer';
import reports from './reports-reducer';
import common from './common-reducer';

export default combineReducers({
	survivors,
	reports,
  common,
  routing: routerReducer,
  form: formReducer
})
