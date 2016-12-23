import React from 'react';
import { connect } from 'react-redux';
import { fetchReportList } from '../actions/report-actions';


class FetcherReports extends React.Component {
  componentWillMount(){
    this.props.fetch();
  }
  render() { return null }
}


const mapDispatchToProps = dispatch  => ({
  fetch() {
    return dispatch(fetchReportList())
  }
});

export default FetcherReports = connect(null, mapDispatchToProps)(FetcherReports);
