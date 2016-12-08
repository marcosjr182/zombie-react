import React from 'react';
import Survivor from '../components/survivor';

import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

class SurvivorListPage extends React.Component {

	constructor(props) {
		super(props)
		this._getSurvivor = this._getSurvivor.bind(this);
	}

	render() {
		return (
			<div className="col-md-12 survivor-list">
				{ this.props.survivors.map(this._getSurvivor) }
			</div>
		);
	}


	_getSurvivor(survivor) {
		return ( <Survivor
				 			{...survivor}
				 			key={this._getKey(survivor.location)} />
		);
	}


	_getKey(location) {
		return location.split("/").pop();
	}

  componentWillMount(){
    this.props.dispatch(fetchSurvivors());
  }
}

const mapStateToProps = store => {
	return { survivors: store.survivors.survivors }
}

export default connect(mapStateToProps)(SurvivorListPage)
