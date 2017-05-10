import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Survivor from './survivor'
import { fetchItems } from '../ducks/items'
import { getSurvivorById, parseItems } from '../selectors/survivor-selector'

import styles from './survivor-card.scss'

const SurvivorCardPresenter = ({ id, survivor, items}) =>
  <Link to={`/survivor/${id}`} className="col-sm-4 col-md-3 card-container">
    <div styleName={`card${false ? '--infected' : ''}`}   className="col-xs-12 card survivor-card">
      <Survivor {...survivor} items={items} />
    </div>
  </Link>

class SurvivorCard extends React.Component {
  componentWillMount() {
    this.props.getItems(this.props.id)
  }

  render(){
    return <SurvivorCardPresenter {...this.props} />
  }
}

const mapStateToProps = (store, { id }) => ({
  survivor: getSurvivorById(store.survivors, id),
  items: parseItems(store.survivors.items[id])
})

const mapDispatchToProps = ({
  getItems: fetchItems
})

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard)
