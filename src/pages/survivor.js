
import React from 'react';
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
//		var infected_class = this.state.survivor ? 'infected' : '';
		return (
			<div className="col-xs-12 card-container {infected_class}">
					<div className="col-xs-12 card survivor-page">
						<div className="col-xs-12 col-sm-6 info">
							<h2 className="col-xs-12 name">
								{ this.state.survivor.name }
							</h2>
							<div className="col-xs-12 details">
								{ ( this.state.survivor.gender == 'M' ) ? "MALE" : "FEMALE" }
								| { this.state.survivor.age }
							</div>
							<div className="col-sm-6 col-xs-12 properties">
								<Properties location={this.state.survivor.id} key={this.state.survivor.id	} />
							</div>
							<div className="col-xs-12 col-sm-6 actions">
								<a className="btn btn-sm btn-default btn-report" onClick={ this._reportSurvivor() }>REPORT</a>
								<a className="btn btn-sm btn-default btn-trade" onClick={ this._reportSurvivor() }>TRADE</a>
							</div>
						</div>

						<div className="col-sm-6 map">
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
