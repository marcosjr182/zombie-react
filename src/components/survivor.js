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
				<Link to={`/survivor/${this.props.id}`}>
					<div className="col-md-12 card survivor-card">
						<div className="col-xs-12 name">
							{ this.props.name }
						</div>

						<div className="col-xs-12 info">
							{ ( this.props.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.props.age }
						</div>

						<Properties id={this.props.id} key={'sp_'+this.props.location} />

            { this.renderDistance() }
				</div>
			</Link>
			</div>
		);
	}

  renderDistance() {
    if (this.props.distance)
      return (
        <div className="col-md-12 distance">
          { this.props.distance } away
        </div>
      );
  }

}
