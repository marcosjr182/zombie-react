import React from 'react';
import { connect } from 'react-redux';
import { initialFetch, prepareSurvivorListPage } from '../actions/survivor-actions';

import { getSurvivorsByPage } from '../selectors/survivor-list-selector'

class SurvivorListFetcher extends React.Component {
  componentWillMount(){
    this.props.fetch()
  }
  componentWillReceiveProps({ list, currentPage, mySurvivor }){
    if (this.props.list != list || this.props.currentPage != currentPage)
      this.props.fetchPage(list, currentPage, mySurvivor.lastSeen)
  }

  render() { return null }
}

const mapStateToProps = ({ survivors }) => {
  return {
    currentPage: survivors.pagination.currentPage,
    list: survivors.raw,
    mySurvivor: survivors.mySurvivor,
    survivorListPage: survivors.survivors
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPage(list, currentPage, userLastSeen){
    const survivorListPage = getSurvivorsByPage({
      list,
      currentPage,
      userLastSeen
    })

    dispatch(prepareSurvivorListPage(survivorListPage))
  },
  fetch(){
    dispatch(initialFetch())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
