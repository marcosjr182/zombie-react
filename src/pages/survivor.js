import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Map from "../layout/map";
import Properties from '../components/properties';
import { FetcherSurvivor } from '../fetchers/fetcher';
import { reportSurvivor } from '../actions/survivor-actions';

const genderName = (gender) =>
  ( gender == 'M' ) ? "MALE" : "FEMALE";

const SurvivorPage = ({ survivor, params: { id }, handleReport }) =>
	<div className="col-xs-12 survivor-page">
    <FetcherSurvivor id={id} />
		<div className="col-xs-12 col-sm-6 info">
      <div className="col-xs-12 navbar-actions">
        <Link to="/list" className="btn btn-default btn-navbar">Back</Link>
        <a onClick={handleReport}
					 className="col-xs-12 btn btn-sm btn-default btn-report">REPORT</a>
        <Link to={`/trade/${survivor.id}`}
							className="col-xs-12 btn btn-sm btn-default btn-trade">TRADE</Link>
      </div>
			<h2 className="col-xs-12 name">
				{survivor.name}
			</h2>
			<div className="col-xs-12 details">
				{ genderName(survivor.gender) } | {survivor.age}
			</div>
			<div className="col-sm-6 col-xs-12 properties">
				<Properties items={survivor.items} />
			</div>
		</div>

		<Map center={survivor.lastSeen} />
	</div>

const mapDispatchToProps = (dispatch) => ({
  handleReport(id){
    dispatch(reportSurvivor(id))
  }
})

const mapStateToProps = store => {
	return { survivor: store.survivors.survivor }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurvivorPage)
