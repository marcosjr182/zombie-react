import React from 'react';
import { connect } from 'react-redux';
import { fetchReportList, fetchReports } from '../actions/report-actions';


class FetcherReports extends React.Component {
  componentWillMount(){
    this.props.fetch().then((action) =>
      this.props.fetchReports(action.payload)
    );
  }
  render() { return null }
}


const mapDispatchToProps = dispatch  => ({
  fetch() {
    return dispatch(fetchReportList())
  },
  fetchReports(list){
    dispatch(fetchReports(list))
  }
});

export default FetcherReports = connect(null, mapDispatchToProps)(FetcherReports);
