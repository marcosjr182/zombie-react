import React from 'react'

export default ({ report }) =>
  <div className="col-xs-6 col-sm-4 card-container">
    <div className="col-xs-12 card report">
      { renderReport(report) }
    </div>
  </div>

const renderReport = (report) =>
  Object.keys(report).map((attr, key) =>
    renderAttribute(attr, report[attr], key)
  )

const renderAttribute = (name, value, key) =>
  (name == 'description')
    ? <h4 key={key}>{value}</h4>
    : <div className="col-xs-12" key={key}>
        {`${name}: ${value.toFixed(2)}`}
      </div>
