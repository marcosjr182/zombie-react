import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Map from "../layout/map";
import Properties from '../components/properties';

import SurvivorFetcher from '../fetchers/survivor-fetcher';
import { reportSurvivor } from '../actions/survivor-actions';
import { parseSurvivor, parseItems } from '../selectors/survivor-selector'


const genderName = (gender) =>
  ( gender == 'M' ) ? "MALE" : "FEMALE";

const TradeButton = ({ survivorId, userId }) =>
  (userId === survivorId)
    ? ''
    : <Link className="btn btn-sm btn-default btn-navbar"
             to={`/trade/${survivorId}`}>TRADE</Link>

const SurvivorPage = ({ userId, survivor, items, handleReport, params: { id } }) =>
	<div className="col-xs-12 survivor-page">
    <SurvivorFetcher id={id} />
		<div className="col-xs-12 col-sm-6 info">
      <div className="col-xs-12 navbar-actions">
        <Link to="/list" className="btn btn-sm btn-default btn-navbar">BACK TO LIST</Link>
        <Link onClick={handleReport}
              className="btn btn-sm btn-default btn-navbar">REPORT</Link>
        <TradeButton userId={userId} survivorId={survivor.id} />
      </div>
			<h2 className="col-xs-12 name">
				{survivor.name}
			</h2>
			<div className="col-xs-12 details">
				{ genderName(survivor.gender) } | {survivor.age}
			</div>
			<div className="col-sm-6 col-xs-12 properties">
				<Properties items={items} />
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

const mapStateToProps = ({ survivors }, { params: { id }}) => ({
  survivor: parseSurvivor(survivors.survivor),
  items: parseItems(survivors.items[id]),
  user: survivors.mySurvivor
})
export default connect(mapStateToProps, mapDispatchToProps)(SurvivorPage)
