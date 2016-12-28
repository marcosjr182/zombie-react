import React from 'react'
import Survivor from './survivor'
import { connect } from 'react-redux'

import { fetchItems } from '../actions/survivor-actions'
import { getSurvivorById, parseItems } from '../selectors/survivor-selector'

class SurvivorCard extends React.Component {
  componentWillMount() {
    this.props.getItems(this.props.id)
  }
  render(){
    return (<Survivor {...this.props.survivor} items={this.props.items} />)
  }
}

const getSurvivor = (store, id) =>
  getSurvivorById(store.survivors, id)

const mapStateToProps = (store, { id }) => ({
  survivor: getSurvivor(store, id),
  items: parseItems(store.survivors.items[id])
})

const mapDispatchToProps = (dispatch) => ({
  getItems(id) {
    dispatch(fetchItems(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard)
