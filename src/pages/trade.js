import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { FetcherSurvivor } from '../fetchers/fetcher';
import Properties from '../components/properties';
import TradeForm from '../forms/trade-form';

const ShouldSignInError = () =>
  <div className="col-xs-12 trade-page error text-center">
    <div className="col-xs-12">You need to Sign In before trade items.</div>
    <div className="col-xs-12"> <Link className="btn btn-default" to="/list">Back to List</Link> </div>
  </div>

const ItemShowcase = ({ className, survivor }) =>
  <div className={`col-xs-6 ${className}`}>
    <div className="col-xs-12 name"> {survivor.name} </div>
    <Properties items={survivor.items} columns='3' />
  </div>

const TradeHeader = ({ mySurvivor, survivor, survivorId }) =>
  <div className="col-xs-12 trade-page">
    <FetcherSurvivor id={survivorId} />
    <div class="row">
      <ItemShowcase className='origin' survivor={mySurvivor} />
      <ItemShowcase className='recipient' survivor={survivor} />
    </div>
    <TradeForm survivor={{ name: mySurvivor.name, id: mySurvivor.id }} />
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
