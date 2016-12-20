import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Survivor from '../components/survivor';
import SurvivorListFetcher from '../fetchers/survivor-list-fetcher';

const listSurvivors = (survivors) =>
  survivors.map((survivor) =>
    <Survivor	{...survivor} key={survivor.id} />
  )

const SurvivorListPage = ({ survivors, onPageChange, pagination }) =>
  <div className="col-xs-12 survivor-list">
    <SurvivorListFetcher page={pagination.currentPage} />
    { listSurvivors(survivors) }
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      breakLabel={<a href="">...</a>}
      breakClassName={"break-me"}
      pageCount={pagination.numberOfPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={10}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination text-center"}
      activeClassName={"active"} />
  </div>

const mapStateToProps = store => {
  return {
    pagination: store.survivors.pagination,
    survivors: store.survivors.survivors,
    isSigned: store.survivors.isSigned,
    mySurvivor: store.survivors.mySurvivor
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPageChange(data){
    dispatch({
      type: 'GO_TO_PAGE',
      payload: data.selected
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListPage)
