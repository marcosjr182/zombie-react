import React from 'react';
import { connect } from 'react-redux';
import { fetchReportList } from '../actions/report-actions';

class ReportsPage extends React.Component {
  render(){
    return(
      <div className="col-md-12">
      </div>
    )
  }

  test() {
    console.log(this.props.list)
  }
  componentWillMount(){
    this.props.dispatch(fetchReportList());
  }
}

const mapStateToProps = store => {
  return { list: store.reports.list }
}
export default connect(mapStateToProps)(ReportsPage)
