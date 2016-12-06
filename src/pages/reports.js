import React from 'react';
import jQuery from 'jquery';
import Report from '../components/report';


export default class ReportsPage extends React.Component {

	constructor() {
		super();

		this.state = {
			reports: []
		};
	}

	render() {
		const reports = this._getReports();
		return (
			<div className="col-md-12">
				{reports}
			</div>
		);
	}

	_getReports() {
		return this.state.reports.map((report) => {
			return <Report
						 		location={report}
						 		key={report} />
		});
	}

	_fetchReports() {
		jQuery.ajax({
			method: 'GET',
			url: 'http://zssn-backend-example.herokuapp.com/api/report.json',
			success: (data) => {
				this.setState({ reports: data });
			}
		});
	}

  componentWillMount(){
    this._fetchReports();
  }
}
