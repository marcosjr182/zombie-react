import { getReportList, getReport } from '../api';

export function fetchReports(list){
  return function (dispatch) {
    list.map((location) =>
      getReport(location)
        .then((res) =>
          dispatch({
            type: 'FETCH_REPORT',
            payload: res.data.report
          })
        )
    )
  }
}

export function fetchReportList(){
  return function (dispatch){
    return getReportList()
      .then((res) => {
        dispatch({
          type: 'FETCH_REPORT_LIST',
          payload: res.data
        })
        dispatch(fetchReports(res.data))
      })
  }
}
