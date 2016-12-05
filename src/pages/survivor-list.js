import React from 'react';
import jQuery from 'jquery';
import Survivor from '../components/survivor';
import MySurvivor from '../components/my-survivor';


export default class SurvivorListPage extends React.Component {
	
	constructor() {
		super();

		this.state = {
			survivors: [],
			mySurvivor: {}
		};
	}

	render() {	
		var survivors = this._getSurvivors(),
				mySurvivor = () => {
					if (this.state.mySurvivor)
						return ( <MySurvivor {...this.state.mySurvivor} key={this._getKey(this.state.mySurvivor.location)} /> )
				}

 		return (
			<div className="col-md-12 survivor-list">
				{ mySurvivor }
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
