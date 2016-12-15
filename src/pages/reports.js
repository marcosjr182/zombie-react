import React from 'react';
import { connect } from 'react-redux';
import { fetchReportList } from '../actions/report-actions';

class ReportsPage extends React.Component {
  render(){
    <div className="col-md-12">
    </div>
  }
  componentWillMount(){
    this.props.dispatch(fetchReportList());
  }
}

const mapStateToProps = store => {
  return { list: store.reports.list }
}
export default connect(mapStateToProps)(ReportsPage)
