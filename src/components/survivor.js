import React from 'react';
import {Link} from 'react-router';
import Properties from './properties';

export default class Survivor extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 card-container">
				<Link to={`/survivor/${this.props.location.split('/').pop()}`}>
					<div className="col-xs-12 card survivor-card">
						<div className="col-xs-12 name">
							{ this.props.name }
						</div>

						<div className="col-xs-12 info">
							{ ( this.props.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.props.age }
						</div>

						<Properties id={this.props.location.split('/').pop()} key={'scard_'+this.props.location} />

						<div className="col-xs-12 distance">
							5 km away
						</div>
				</div>
			</Link>
			</div>
		);
	}

}
