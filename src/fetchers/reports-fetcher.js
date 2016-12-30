import React from 'react'
import { connect } from 'react-redux'
import { fetchReportsPage } from '../actions/report-actions'

class FetcherReports extends React.Component {
  componentWillMount(){
    this.props.fetch();
  }
  render() { return null }
}

const mapDispatchToProps = dispatch  => ({
  fetch() {
    return dispatch(fetchReportsPage())
  }
})

export default FetcherReports = connect(null, mapDispatchToProps)(FetcherReports)
