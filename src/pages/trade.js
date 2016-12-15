import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivor } from '../actions/survivor-actions';
import Properties from '../components/properties';
import TradeForm from '../forms/trade-form';

class TradePage extends React.Component {
  constructor(){
    super()
    this.handleTradeSubmit = this.handleTradeSubmit.bind(this)
  }

  render(){
    return(
      <div className="col-xs-12 trade-page">
        <div className="col-xs-12 origin">
          <div className="col-xs-12 name"> {this.props.survivor.name} </div>
          <Properties items={this.props.survivor.items} columns='3' />
        </div>
        <div className="col-xs-12">
          <TradeForm onSubmit={this.handleTradeSubmit} />
        </div>
      </div>
    )
  }

  handleTradeSubmit(values){
    // prepare and dispatch trade
    console.log(values);
  }

  componentWillMount(){
    this.props.dispatch(fetchSurvivor(this.props.params.id));
  }
}

const mapStateToProps = store => {
  return {
    survivor: store.survivors.survivor,
    mySurvivor: store.survivors.mySurvivor
   }
}
export default connect(mapStateToProps)(TradePage)
