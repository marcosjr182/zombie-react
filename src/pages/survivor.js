
import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import Properties from '../components/properties';

export default class SurvivorPage extends React.Component {


	constructor() {
		super();
		this.state = {
			survivor: {}
		}
	}

	render() {
		var infected_class = this.state.survivor ? 'infected' : '';
		return (
			<div className="col-md-12 card-container {infected_class}">
				<div className="col-md-12 card ">
					<div className="col-xs-6 info">
						<a onClick={ this._reportSurvivor() }>REPORT</a>
						<div className="col-xs-12 name">{ this.state.survivor.name }</div>
						{ ( this.state.survivor.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.state.survivor.age }
					</div>

					<div className="col-xs-6 map">
						map
					</div>
				</div>
			</div>
		);
	}

	_fetchSurvivor() {
		jQuery.ajax({
			method: 'GET',
			url: 'http://zssn-backend-example.herokuapp.com/api/people/'+this.props.params.id+'.json',
			success: (data) => {
				this.setState({ survivor: data });
			}
		});
	}

	_reportSurvivor(){

	}

	componentWillMount(){
		this._fetchSurvivor();
	}


}
