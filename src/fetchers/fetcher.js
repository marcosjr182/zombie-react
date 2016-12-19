import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivor, fetchSurvivors } from '../actions/survivor-actions';

class Fetcher extends React.Component {
  componentWillMount(){
    this.props.fetch(this.props.id);
  }

  render() {
    return null
  }
}

let mapDispatchToProps = dispatch => ({
  fetch(id) {
    dispatch(fetchSurvivor(id))
  }
});
export const FetcherSurvivor = connect(null, mapDispatchToProps)(Fetcher);

mapDispatchToProps = dispatch => ({
  fetch() { dispatch(fetchSurvivors()) }
});
export const FetcherSurvivorList = connect(null, mapDispatchToProps)(Fetcher);
