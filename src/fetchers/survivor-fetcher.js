import React from 'react'
import { connect } from 'react-redux'
import { prepareSurvivor } from '../actions/survivor-actions'

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
    dispatch(prepareSurvivor(id))
  }
});

export default SurvivorFetcher = connect(null, mapDispatchToProps)(SurvivorFetcher);
