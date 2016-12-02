import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

export default class Report extends React.Component {
	
	constructor(){
		super();

		this.state = {
			report: {}
		}
	}
 
	render() {
		return (
			<div className="col-md-6 card-container">
				<div className="col-md-12 card report">
					<div className="col-md-12 description">
						{this.state.report.description}
					</div>
				</div>
			</div>
		);
	}

	_fetchReport() {
		jQuery.ajax({
			method: 'GET',
			url: this.props.location,
			success: (data) => {
				this.setState({ report: data.report });
			}
		});
	}

	componentWillMount(){
		this._fetchReport();
	}

}
