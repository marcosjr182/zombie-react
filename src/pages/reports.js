import React from 'react';
import { connect } from 'react-redux';
import FetcherReports  from '../fetchers/fetcher-reports';

const Report = ({ description, name }) =>
  <div className="col-md-6 card-container">
    <div className="col-md-6 card report">
      <div className="col-md-12 description">
        {description}
      </div>
      <div className="col-md-12 value">
        {value}
      </div>
    </div>
  </div>

const renderReports = (reports) =>
  reports.map((report, i) => <Report {...report} key={i}/> );

const ReportsPage = ({ reports, list }) =>
  <div className="col-md-12 reports-page">
    <FetcherReports />
    { renderReports(reports) }
  </div>

const mapStateToProps = store => {
  return {
    list: store.reports.list,
    reports: store.reports.reports
  }
}
export default connect(mapStateToProps)(ReportsPage)
