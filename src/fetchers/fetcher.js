import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivor, fetchSurvivors,
         setSurvivorListPage } from '../actions/survivor-actions';

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



class SurvivorListFetcher extends React.Component {
  componentWillMount(){
    this.props.initialFetch()
  }
  componentWillReceiveProps({ rawSurvivors, page }){
    this.props.fetch(rawSurvivors, page);
  }

  render() {
    return null
  }
}

const mapStateToProps = store => {
  return { rawSurvivors: store.survivors.raw.survivors }
}

mapDispatchToProps = (dispatch) => ({
  fetch(rawSurvivors, page){
    dispatch(setSurvivorListPage(rawSurvivors, page))
  },
  initialFetch(){
    dispatch(fetchSurvivors())
  }
});
export const FetcherSurvivorList = connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
