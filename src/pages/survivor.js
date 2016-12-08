
import React from 'react';
import jQuery from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import Properties from '../components/properties';
import { fetchSurvivor } from '../actions/survivor-actions';

const LocationMap = withGoogleMap(props => {
	<GoogleMap
		defaultZoom={8}
		defaultCenter={props.marker} >

		<Marker {...props.marker} />
	</GoogleMap>
});

class SurvivorPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mySurvivor: {},
			marker: {}
		}
		this._handleReport = this._handleReport.bind(this);
	}

	render() {
//		var infected_class = this.state.survivor ? 'infected' : '';
		return (
			<div className="col-xs-12 survivor-page">
				<div className="col-xs-12 navbar-actions">
					<Link to="/list" className="btn btn-default btn-navbar">Back</Link>
				</div>
				<div className="col-xs-12 col-sm-6 info">
					<h2 className="col-xs-12 name">
						{ this.props.survivor.name }
					</h2>
					<div className="col-xs-12 details">
						{ ( this.props.survivor.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.props.survivor.age }
					</div>
					<div className="col-sm-6 col-xs-12 properties">
						<Properties id={this.props.survivor.id} key={'sp_'+this.props.survivor.id	} />
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

	_handleReport() {
		if (this.state.mySurvivor)
			this.props.dispatch(reportSurvivor(this.props.survivor.id, this.state.mySurvivor.id));
	}

	componentWillMount(){
		this.props.dispatch(fetchSurvivor(this.props.params.id));
	}
}
const mapStateToProps = store => {
	return { survivor: store.survivors.survivor  }
}

export default connect(mapStateToProps)(SurvivorPage)
