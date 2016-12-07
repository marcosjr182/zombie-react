import React from 'react';
import Survivor from '../components/survivor';

import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

@connect((store) => {
	return { survivors: [] };
})
export default class SurvivorListPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var survivors = this._getSurvivors();

 		return (
			<div className="col-md-12 survivor-list">
				{survivors}
			</div>
		);
	}

	_getSurvivors() {
		return this.props.survivors.map((survivor) => {
			return <Survivor
						 		{...survivor}
						 		key={this._getKey(survivor.location)} />
		});
	}


	_getKey(location) {
		return location.split("/").pop();
	}

  componentWillMount(){
    this.props.dispatch(fetchSurvivors());
    this.props.dispatch(fetchSurvivors());
  }
}
