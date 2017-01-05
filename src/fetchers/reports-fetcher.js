import React from 'react'
import { connect } from 'react-redux'
import { fetchReportList } from '../ducks/report-list'
import { fetchReport } from '../ducks/reports'

class ReportsFetcher extends React.Component {
  componentWillMount(){
    this.props.fetch();
  }

  render() { return null }
}

const mapDispatchToProps = dispatch  => ({
  fetch() {
    dispatch(fetchReportList())
      .then(({ payload }) =>
        payload.map((location) => dispatch(fetchReport(location)))
      )
  }
})

export default connect(null, mapDispatchToProps)(ReportsFetcher)
