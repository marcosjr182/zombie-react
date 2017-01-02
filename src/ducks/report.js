import { getReport } from '../api';

const FETCH_REPORT = 'FETCH_REPORT'

export default (state=[], action) =>
  (action.type === FETCH_REPORT)
    ? [...state, action.payload]
    : state

export const fetchReportAction = (data) => ({
  type: FETCH_REPORT,
  payload: data
})

export const fetchReport = (location) => (dispatch) =>
  getReport(location)
    .then((res) => dispatch(fetchReportAction(res.data.report)))
