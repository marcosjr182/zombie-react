import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Map from "../layout/map";
import Properties from '../components/properties';

import { FetcherSurvivor } from '../fetchers/fetcher';
import { reportSurvivor } from '../actions/survivor-actions';

const genderName = (gender) =>
  ( gender == 'M' ) ? "MALE" : "FEMALE";

const tradeButton = (mySurvivorId, survivorId) =>
  (mySurvivorId === survivorId)
    ? '' : <Link className="col-xs-12 btn btn-sm btn-default btn-trade"
                 to={`/trade/${survivorId}`}>TRADE</Link>

const SurvivorPage = ({ mySurvivorId, survivor, handleReport, params: { id } }) =>
	<div className="col-xs-12 survivor-page">
    <FetcherSurvivor id={id} />
		<div className="col-xs-12 col-sm-6 info">
      <div className="col-xs-12 navbar-actions">
        <Link to="/list" className="btn btn-default btn-navbar">Back</Link>
        <Link onClick={handleReport}
              className="col-xs-12 btn btn-sm btn-default btn-report">REPORT</Link>
        { tradeButton(mySurvivorId, id) }
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

const mapDispatchToProps = (dispatch, { params: { id }}) => ({
  handleReport(){
    const data = new FormData().append('infected', id);
    dispatch(reportSurvivor(data))
  }
})

const mapStateToProps = store => {
	return {
    survivor: store.survivors.survivor,
    mySurvivorId: store.survivors.mySurvivor.id
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurvivorPage)
