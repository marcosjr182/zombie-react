import { getReportList } from '../api';
import { simpleReducer } from '../helpers'


const FETCH_REPORT_LIST = 'FETCH_REPORT_LIST'

export default simpleReducer(FETCH_REPORT_LIST, [])

export const fetchReportListAction = (data) => ({
  type: FETCH_REPORT_LIST,
  payload: data
})

export const fetchReportList = () => (dispatch) =>
  getReportList()
    .then((res) => dispatch(fetchReportListAction(res.data)))
