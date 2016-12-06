
import React from 'react';
import {Link} from 'react-router';
import Properties from './properties';

export default class Survivor extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="col-md-4 card-container">
				<Link to={`/survivor/${this.props.location.split('/').pop()}`}>
					<div className="col-md-12 card survivor-card">
						<div className="col-xs-12 name">
							{ this.props.name }
						</div>

						<div className="col-xs-12 info">
							{ ( this.props.gender == 'M' ) ? "MALE" : "FE	MALE" } | { this.props.age }
						</div>

						<Properties location={this.props.location} key={this.props.location} />

						<div className="col-md-12 distance">
							5 km away
						</div>
				</div>
			</Link>
			</div>
		);
	}

}
