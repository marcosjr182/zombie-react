import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Survivor from './survivor'
import { fetchItems } from '../actions/survivor-actions'
import { getSurvivorById, parseItems } from '../selectors/survivor-selector'

class SurvivorCard extends React.Component {
  componentWillMount() {
    this.props.getItems(this.props.id)
  }
  render(){
    const { id } = this.props
    return (
      <Link to={`/survivor/${id}`} className="col-sm-6 col-md-4 card-container">
        <div className="col-xs-12 card survivor-card">
          <Survivor {...this.props.survivor} items={this.props.items} />
        </div>
      </Link>
    )
  }
}

const mapStateToProps = (store, { id }) => ({
  survivor: getSurvivorById(store.survivors, id),
  items: parseItems(store.survivors.items[id])
})

const mapDispatchToProps = (dispatch) => ({
  getItems(id) {
    dispatch(fetchItems(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard)
