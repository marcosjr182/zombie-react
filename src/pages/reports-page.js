import React from 'react'
import { connect } from 'react-redux'

import ReportsFetcher  from '../fetchers/reports-fetcher'
import Report from '../components/report'

const renderReports = (reports) =>
  reports.map((report, i) => <Report report={report} key={i}/> )

const ReportsPage = ({ reports }) =>
  <div className="col-xs-12 page reports-page">
    <ReportsFetcher />
    { renderReports(reports) }
  </div>


const mapStateToProps = ({ reports }) => ({
  list: reports.list,
  reports: reports.reports
})

export default connect(mapStateToProps)(ReportsPage)
