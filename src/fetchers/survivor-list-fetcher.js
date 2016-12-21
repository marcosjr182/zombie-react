import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivors, setSurvivorListPage } from '../actions/survivor-actions';

class SurvivorListFetcher extends React.Component {
  componentWillMount(){
    this.props.initialFetch()
  }
  componentWillReceiveProps({ list, currentPage }){
    this.props.fetchPage(list, currentPage);
  }

  render() {
    return null
  }
}

const mapStateToProps = store => {
  return {
    list: store.survivors.raw.survivors,
    currentPage: store.survivors.pagination.currentPage
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPage(list, page){
    dispatch(setSurvivorListPage(list, page))
  },
  initialFetch(){
    dispatch(fetchSurvivors())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
