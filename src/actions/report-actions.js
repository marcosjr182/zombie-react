import { getReportList } from '../api';

export function fetchReportList(){
  return function(dispatch) {
    console.log('ss')
    getReportList()
      .then((res) => {
        dispatch({
           type: 'FETCH_REPORTS',
           payload: res.data
        })
      });
  }
}
