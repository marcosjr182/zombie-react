import React from 'react';

export default ({ report }) =>
  <div className="col-xs-6 col-sm-4 card-container">
    <div className="col-xs-12 card report">
      { renderReport(report) }
    </div>
  </div>

const renderReport = (report) =>
  Object.keys(report).map(attr => {
    return <ReportInfo name={attr} value={report[attr]} />
  })

const ReportInfo = ({name, value}) =>
  isDescription(name)
    ? <h4>{value}</h4>
    : <div className="col-xs-12">
        {`${name}: ${(+value).toFixed(2)}`}
      </div>

const isDescription = (name) =>
  name == 'description'
