import React from 'react'
import { connect } from 'react-redux'

import { fetchSurvivor } from '../ducks/survivor'
import { fetchItems } from '../ducks/items'

class SurvivorFetcher extends React.Component {
  componentWillMount(){
    this.props.fetch(this.props.id);
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch => ({
  fetch(id) {
    dispatch(fetchSurvivor(id))
      .then(fetchItems(id))
  }
})

export default connect(null, mapDispatchToProps)(SurvivorFetcher);
