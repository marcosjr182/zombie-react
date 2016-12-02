
import React from 'react';
import ReactDOM from 'react-dom';

export default class Survivor extends React.Component {
	

 
	render() {
		return (
			<div className="col-md-3 card-container">
				<div className="col-md-12 card survivor-card">
					<div className="col-md-12 name">{this.props.name}</div>
					<div className="col-md-12 properties">
						properties-list
					</div>
					<div className="col-md-12 distance">
						5 km away
					</div>
				</div>
			</div>
		);
	}
}
