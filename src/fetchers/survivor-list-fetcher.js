import React from 'react';
import { connect } from 'react-redux';
import { fetchSurvivors, setSurvivorListPage } from '../actions/survivor-actions';

class SurvivorListFetcher extends React.Component {
  constructor(){
    super()
    this.test = true;
  }
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
    dispatch(setSurvivorListPage(list, page))
  },
  initialFetch(){
    dispatch(fetchSurvivors())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
