import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Map from "../layout/map";
import Properties from '../components/properties';
import { fetchSurvivor, reportSurvivor } from '../actions/survivor-actions';

class SurvivorPage extends React.Component {
	constructor() {
		super();
		this._handleReport = this._handleReport.bind(this);
	}

  genderName(){
    return ( this.props.survivor.gender == 'M' ) ? "MALE" : "FEMALE";
  }

	render() {
    const { survivor } = this.props;
		return (
			<div className="col-xs-12 survivor-page">
				<div className="col-xs-12 col-sm-6 info">
          <div className="col-xs-12 navbar-actions">
            <Link to="/list" className="btn btn-default btn-navbar">Back</Link>
            <a onClick={this._handleReport} className="col-xs-12 btn btn-sm btn-default btn-report">REPORT</a>
            <Link to={`/trade/${survivor.id}`} className="col-xs-12 btn btn-sm btn-default btn-trade">TRADE</Link>
          </div>
					<h2 className="col-xs-12 name">
						{ survivor.name }
					</h2>
					<div className="col-xs-12 details">
						{ this.genderName() } | { survivor.age }
					</div>
					<div className="col-sm-6 col-xs-12 properties">
						<Properties items={survivor.items} />
					</div>
				</div>

				<Map center={survivor.lastSeen} />
			</div>
		);
	}

	_handleReport() {
    this.props.dispatch(reportSurvivor(this.props.survivor.id));
	}

	componentWillMount(){
		this.props.dispatch(fetchSurvivor(this.props.params.id));
	}
}

const mapStateToProps = store => {
	return { survivor: store.survivors.survivor }
}
export default connect(mapStateToProps)(SurvivorPage)
