import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

class FetcherSurvivorList extends React.Component {
  componentWillMount(){
    this.props.fetch();
  }

  render() { return null }
}


const mapDispatchToProps = dispatch => ({
  fetch() {
    dispatch(fetchSurvivors())
  }
});

export default FetcherSurvivorList = connect(null, mapDispatchToProps)(FetcherSurvivorList);
