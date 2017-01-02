import { fetchReportList } from '../ducks/report-list'
import { fetchReport } from '../ducks/report'

export const fetchReportsPage = () => dispatch => {
  dispatch(fetchReportList()).then(
    (action) => action.payload.map(
      location =>dispatch(fetchReport(location.report))
    )
  )
}
