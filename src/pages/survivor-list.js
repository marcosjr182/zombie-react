import React from 'react';
import jQuery from 'jquery';
import Survivor from '../components/survivor';


export default class SurvivorListPage extends React.Component {
	
	constructor() {
		super();

		this.state = {
			survivors: []
		};
	}

	render() {	
		const survivors = this._getSurvivors();
		return (
			<div className="col-md-12 survivor-list">
				{survivors}
			</div>
		);
	}

	_getSurvivors() {
		return this.state.survivors.map((survivor) => {
			return <Survivor
						 		{...survivor}
						 		key={this._getKey(survivor.location)} />
		});
	}

	_fetchSurvivors() {
		jQuery.ajax({
			method: 'GET',
			url: 'api/people.json',
			success: (data) => {
				this.setState({ survivors: data });
			}
		});
	}

	_getKey(location) {
		return location.split("/").pop();
	}

  componentWillMount(){
    this._fetchSurvivors();
  }
}
