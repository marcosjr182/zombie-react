import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivor } from '../actions/survivor-actions';

class Fetcher extends React.Component {
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
  }
});

export const FetcherSurvivor = connect(null, mapDispatchToProps)(Fetcher);
