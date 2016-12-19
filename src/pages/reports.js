import React from 'react';
import { connect } from 'react-redux';
import FetcherReports  from '../fetchers/fetcher-reports';

const isDescription = (name) =>
  name == 'description'

const ReportInfo = ({name, value}) =>
  isDescription(name)
    ? <h4 className='text-center'>{value}</h4>
    : <div className="col-xs-12">
        {`${name}: ${(+value).toFixed(1)}%`}
      </div>

const renderReport = (report) =>
  Object.keys(report).map(attr => {
    return <ReportInfo name={attr} value={report[attr]} />
  })

const Report = ({ report }) =>
  <div className="col-xs-6 col-sm-4 card-container">
      <div className="col-xs-12 card report">
      { renderReport(report) }
    </div>
  </div>

const ReportsPage = ({ reports }) =>
  <div className="col-xs-12 page reports-page">
    <FetcherReports />
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
