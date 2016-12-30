import { combineReducers } from 'redux'
import reports from '../ducks/reports'
import reportList from '../ducks/report-list'

export default combineReducers({
  reports,
  reportList
})
