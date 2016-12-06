
import React from 'react';
import jQuery from 'jquery';
import Properties from '../components/properties';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const LocationMap = withGoogleMap(props => {
	<GoogleMap
		defaultZoom={8}
		defaultCenter={props.marker} >

		<Marker {...props.marker} />
	</GoogleMap>
});

export default class SurvivorPage extends React.Component {


	constructor() {
		super();
		this.state = {
			survivor: {},
			marker: {}
		}
		this._handleReport = this._handleReport.bind(this);
	}

	render() {
//		var infected_class = this.state.survivor ? 'infected' : '';
		return (
			<div className="col-xs-12 survivor-page">
				<div className="col-xs-12 col-sm-6 info">
					<h2 className="col-xs-12 name">
						{ this.state.survivor.name }
					</h2>
					<div className="col-xs-12 details">
						{ ( this.state.survivor.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.state.survivor.age }
					</div>
					<div className="col-sm-6 col-xs-12 properties">
						<Properties id={this.state.survivor.id} key={'sp_'+this.state.survivor.id	} />
					</div>
					<div className="col-xs-12 col-sm-offset-2 col-sm-4 actions">
						<a onClick={this._handleReport} className="col-xs-12 btn btn-sm btn-default btn-report">REPORT</a>
						<a className="col-xs-12 btn btn-sm btn-default btn-trade" >TRADE</a>
					</div>
				</div>

				<div className="col-sm-6 map">
					<LocationMap
						containerElement={
				      <div style={{ height: `100%` }} />
				    }
				    mapElement={
				      <div style={{ height: `100%` }} />
				    }
						 />
				</div>
			</div>
		);
	}

	_fetchSurvivor() {
		jQuery.ajax({
			method: 'GET',
			url: 'http://zssn-backend-example.herokuapp.com/api/people/'+this.props.params.id+'.json',
			success: (data) => {
				this.setState({
					survivor: data
				});
			}
		});
	}

	_handleReport() {
		jQuery.ajax({
			method: 'POST',
			data: { infected: this.props.params.id, id: this.props.params.id }, // id= mySurvivor.id
			url: 'http://zssn-backend-example.herokuapp.com/api/people/'+this.props.params.id+'/report_infection.json',
			success: () => {
				alert(`${this.state.survivor.name} was reported`);
			}
		});
	}

	componentWillMount(){
		this._fetchSurvivor();
	}


}
