import React from 'react';
import { connect } from 'react-redux';

import { resetItems } from '../ducks/items'
import { pagesQty } from '../ducks/pagination'
import { fetchSurvivors } from '../ducks/raw'
import { fetchSurvivorListPage } from '../ducks/survivors'

import { getSurvivorsByPage, calculatePages } from '../selectors/survivor-list-selector'

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

const mapStateToProps = ({ survivors }) => ({
  currentPage: survivors.pagination.currentPage,
  list: survivors.raw,
  mySurvivor: survivors.mySurvivor,
  survivorListPage: survivors.survivors
})

const mapDispatchToProps = (dispatch) => ({
  fetchPage(list, currentPage, userLastSeen){
    const survivorListPage = getSurvivorsByPage({
      list,
      currentPage,
      userLastSeen
    })


    dispatch(fetchSurvivorListPage(survivorListPage))
  },
  fetch(){
    dispatch(fetchSurvivors())
      .then(({ payload }) =>
        dispatch(pagesQty(
          calculatePages(payload.length)
        ))
      )
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListFetcher);
