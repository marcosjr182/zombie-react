import { combineReducers } from "redux";

import survivors from './survivors-reducer';
import reports from './reports-reducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	survivors,
	reports,
  form: formReducer
})
