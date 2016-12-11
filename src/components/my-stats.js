import React from 'react';
import Properties from './properties';

export default class MyStats extends React.Component {

	constructor() {
		super();
	}

	render() {

		return (
				<div className="col-xs-12 my-stats">
						<div className="col-xs-5 name"> { this.props.name } </div>
						<div className="col-xs-7">
							<Properties id={this.props.id} key={'my_'+this.props.location} />
            </div>
				</div>
		);
	}

}
