import { getReportList, getReport } from '../api';
import { parseReport } from '../helpers';

export function fetchReports(list){
  return function (dispatch) {
    list.map((location) =>
      getReport(location)
        .then((res) =>
          dispatch({
            type: 'FETCH_REPORT',
            payload: parseReport(res.data.report)
          })
        )
    )
  }
}

export function fetchReportList(){
  return function (dispatch){
    return getReportList()
      .then((res) =>
        dispatch({
          type: 'FETCH_REPORT_LIST',
          payload: res.data
        })
      )
  }
}
