import { combineReducers } from "redux";

import survivors from './survivors-reducer';
import reports from './reports-reducer';

export default combineReducers({
	survivors,
	reports
})
