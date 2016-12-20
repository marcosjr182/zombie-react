import React from 'react';
import { connect } from 'react-redux';
import Paginator from '../components/paginator';

import Survivor from '../components/survivor';
import { FetcherSurvivorList } from '../fetchers/fetcher';

const listSurvivors = (survivors) =>
  survivors.map((survivor) =>
    <Survivor	{...survivor} key={survivor.id} />
  )

const SurvivorListPage = ({ survivors, currentPage }) =>
  <div className="col-xs-12 survivor-list">
    <FetcherSurvivorList page={currentPage} />
    { listSurvivors(survivors) }
    <Paginator />
  </div>

const mapStateToProps = store => ({
  currentPage: store.common.currentPage,
  survivors: store.survivors.survivors,
  isSigned: store.survivors.isSigned,
  mySurvivor: store.survivors.mySurvivor
})
export default connect(mapStateToProps)(SurvivorListPage)
