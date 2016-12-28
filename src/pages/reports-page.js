import React from 'react';
import { connect } from 'react-redux';

import ReportsFetcher  from '../fetchers/reports-fetcher';
import Report from '../components/report';

const ReportsPage = ({ reports }) =>
  <div className="col-xs-12 page reports-page">
    <ReportsFetcher />
    { renderReports(reports) }
  </div>

const renderReports = (reports) =>
  reports.map((report, i) => <Report report={report} key={i}/> );

const mapStateToProps = store => {
  return {
    list: store.reports.list,
    reports: store.reports.reports
  }
}
export default connect(mapStateToProps)(ReportsPage)
