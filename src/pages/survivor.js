import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Map from "../layout/map";
import Properties from '../components/properties';
import { fetchSurvivor } from '../actions/survivor-actions';

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
		return (
			<div className="col-xs-12 survivor-page">
				<div className="col-xs-12 col-sm-6 info">
          <div className="col-xs-12 navbar-actions">
            <Link to="/list" className="btn btn-default btn-navbar">Back</Link>
            <a onClick={this._handleReport} className="col-xs-12 btn btn-sm btn-default btn-report">REPORT</a>
            <a className="col-xs-12 btn btn-sm btn-default btn-trade" >TRADE</a>
          </div>
					<h2 className="col-xs-12 name">
						{ this.props.survivor.name }
					</h2>
					<div className="col-xs-12 details">
						{ ( this.props.survivor.gender == 'M' ) ? "MALE" : "FEMALE" } | { this.props.survivor.age }
					</div>
					<div className="col-sm-6 col-xs-12 properties">
						<Properties id={this.props.survivor.id} key={'sp_'+this.props.survivor.id	} />
					</div>
				</div>

				<Map center={this.props.survivor.lastSeen} />
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
	return { survivor: store.survivors.survivor }
}

export default connect(mapStateToProps)(SurvivorPage)
