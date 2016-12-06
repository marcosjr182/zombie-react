
import React from 'react';
import Properties from './properties';

export default class MyStats extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
			<div className="col-md-12 card-container">
				<div className="col-md-12 card my-survivor-card">
					<div className="col-xs-12 col-sm-8 info ">
						<div className="col-xs-8"> { this.props.name } </div>
						<div className="col-xs-4"> <Properties id={this.props.location.split('/').pop()} key={'my_'+this.props.location} /> </div>
					</div>
				</div>
			</div>
		);
	}

}
