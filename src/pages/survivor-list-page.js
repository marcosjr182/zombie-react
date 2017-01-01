import React from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import SurvivorList from '../components/survivor-list'
import SurvivorListFetcher from '../fetchers/survivor-list-fetcher'

const SurvivorListPage = ({ survivors, onPageChange, pagination }) =>
  <div className="col-xs-12 survivor-list">
    <SurvivorListFetcher />
    <SurvivorList survivors={survivors} />
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

const mapStateToProps = ({ survivors })=> ({
  pagination: survivors.pagination,
  survivors: survivors.survivors,
  isSigned: survivors.isSigned,
  mySurvivor: survivors.mySurvivor
})

const mapDispatchToProps = (dispatch) => ({
  onPageChange({ selected }){
    dispatch(changePage(selected))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorListPage)
