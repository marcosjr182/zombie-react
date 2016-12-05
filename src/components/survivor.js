
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Properties from './properties';

export default class Survivor extends React.Component {
	

	constructor(props) {
		super();
	}
 
	render() {
		return (
			<div className="col-md-4 card-container">
				<div className="col-md-12 card survivor-card">
					<div className="col-xs-12 name">{ this.props.name }</div>
					<div className="col-xs-12 info">
						{ ( this.props.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.props.age }
					</div>
					
					<Properties location={this.props.location} />
					
					<div className="col-md-12 distance">
						5 km away
					</div>
				</div>
			</div>
		);
	}

}
