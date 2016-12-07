import React from 'react';
import Survivor from '../components/survivor';

import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

class SurvivorListPage extends React.Component {

	constructor(props) {
		super(props)
		this._getSurvivor = this._getSurvivor.bind(this)
	}

	render() {
		return (
			<div className="col-md-12 survivor-list">
				
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
  	this.setState({
  		store: this.props.store
  	});
  }
}

const mapStateToProps = store => {
	return { store: store }
}

export default connect(mapStateToProps)(SurvivorListPage)

