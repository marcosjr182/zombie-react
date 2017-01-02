import { combineReducers } from 'redux'
import report from '../ducks/report'
import reportList from '../ducks/report-list'

export default combineReducers({
  report,
  reportList
})
