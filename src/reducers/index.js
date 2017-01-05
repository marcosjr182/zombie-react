import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import survivors from './survivors-reducer';
import reports from './reports-reducer';

export default combineReducers({
	survivors,
	reports,
  routing: routerReducer,
  form: formReducer
})
