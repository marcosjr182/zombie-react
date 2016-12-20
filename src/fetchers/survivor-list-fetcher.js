import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivors, setSurvivorListPage } from '../actions/survivor-actions';

class SurvivorListFetcher extends React.Component {
  componentWillMount(){
    this.props.initialFetch()
  }
  componentWillReceiveProps({ list, page }){
    this.props.fetch(list, page);
  }

  render() {
    return null
  }
}

const mapStateToProps = store => {
  return { list: store.survivors.raw.survivors }
}

const mapDispatchToProps = (dispatch) => ({
  fetch(list, page){
    dispatch(setSurvivorListPage(list, page))
  },
  initialFetch(){
    dispatch(fetchSurvivors())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
