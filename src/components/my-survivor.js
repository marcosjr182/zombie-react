
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Properties from './properties';

export default class MySurvivor extends React.Component {
	

	constructor() {
		super();
	}
 
	render() {
		
		return (
			<div className="col-md-12 card-container">
				<div className="col-md-12 card my-survivor-card">
					<div className="col-xs-12 col-sm-6 info ">
						<div className="col-xs-6"> { this.props.name } </div>
						<div className="col-xs-6"> <Properties location={this.props.location} /> </div>
					</div>
				</div>
			</div>
		);
	}

}
