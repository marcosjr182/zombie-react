import React from 'react'
import { connect } from 'react-redux'

import SurvivorFetcher from '../fetchers/survivor-fetcher'
import TradeForm from '../forms/trade-form'

import Survivor from '../components/survivor'
import { parseSurvivor, parseItems } from '../selectors/survivor-selector'

const TradeHeader = ({ mySurvivor, survivor }) =>
  <div className="row">
    <div className="col-xs-12 col-sm-6 origin">
      <Survivor {...mySurvivor} itemColumns='3' />
    </div>
    <div className="col-xs-12 col-sm-6 destination">
      <Survivor {...survivor} itemColumns='3' />
    </div>
  </div>

const TradePage = ({ mySurvivor, survivor, items, params: { id } }) =>
  <div className="col-xs-12 trade-page">
    <SurvivorFetcher id={id} />
    <TradeHeader mySurvivor={mySurvivor} survivor={{...survivor, items: items}} />
    <TradeForm survivor={{ name: mySurvivor.name, id: mySurvivor.id }} />
  </div>

const mapStateToProps = (store, { params: { id }}) => {
  return {
    survivor: parseSurvivor(store.survivors.survivor),
    items: parseItems(store.survivors.items[id]),
    mySurvivor: store.survivors.mySurvivor
  }
}

export default connect(mapStateToProps)(TradePage)
