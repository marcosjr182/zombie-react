import { getReportList } from '../api';

export function fetchReportList(){
  return function(dispatch) {
    getReportList()
      .then((res) => {
        dispatch({
           type: 'FETCH_REPORTS',
           payload: res.data
        })
      });
  }
}
