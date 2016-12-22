import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivors, prepareSurvivorListPage } from '../actions/survivor-actions';

class SurvivorListFetcher extends React.Component {
  componentWillMount(){
    this.props.initialFetch()
  }
  componentWillReceiveProps({ raw, currentPage }){
    this.props.fetchPage(raw, currentPage);
  }

  render() { return null }
}

const mapStateToProps = store => {
  return {
    currentPage: store.survivors.pagination.currentPage,
    raw: store.survivors.raw.survivors
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPage(list, page){
    dispatch(prepareSurvivorListPage(list, page))
  },
  initialFetch(){
    dispatch(fetchSurvivors())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
