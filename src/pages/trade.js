import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { FetcherSurvivor } from '../fetchers/fetcher';
import Properties from '../components/properties';
import TradeForm from '../forms/trade-form';

const ShouldSignInError = () =>
  <div className="col-xs-12 trade-page error text-center">
    <div className="col-xs-12">You need to Sign In before trade items</div>
    <div className="col-xs-12"> <Link className="btn btn-default" to="/list">Back to List</Link> </div>
  </div>

const  ItemShowcase = ({user, consumer}) =>
  <div className={`col-xs-12 `}>
    <div className="col-xs-12 origin">
      <div className="col-xs-12 name"> {user.name} </div>
      <Properties items={user.items} columns='3' />
    </div>
    <div className="col-xs-12 destination">
      <div className="col-xs-12 name"> {consumer.name} </div>
      <Properties items={consumer.items} columns='3' />
    </div>
  </div>

const TradeHeader = ({mySurvivor, survivor, survivorId }) =>
  <div className="col-xs-12 trade-page">
    <FetcherSurvivor id={survivorId} />

    <ItemShowcase user={mySurvivor} consumer={survivor} />
    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
      <TradeForm />
    </div>
  </div>

const TradePage = ({ isSigned, mySurvivor, survivor, params: { id } }) =>
  isSigned
    ? <TradeHeader mySurvivor={mySurvivor} survivor={survivor} survivorId={id} />
    : <ShouldSignInError />


const mapStateToProps = store => {
  return {
    survivor: store.survivors.survivor,
    mySurvivor: store.survivors.mySurvivor,
    isSigned: store.survivors.isSigned
   }
}
export default connect(mapStateToProps)(TradePage)
