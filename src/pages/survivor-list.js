import React from 'react';
import { connect } from 'react-redux';

import Survivor from '../components/survivor';
import FetcherSurvivorList from '../fetchers/fetcher-survivor-list';

class SurvivorListPage extends React.Component {
	render() {
		const listSurvivors = (survivors) =>
			survivors.map((survivor) => {
			  return (<Survivor	{...survivor} key={survivor.id} />)
			})

    return (
      <div className="col-xs-12 survivor-list">
        <FetcherSurvivorList />
        { listSurvivors(this.props.survivors) }
      </div>
    )
  }
}

const mapStateToProps = store => {
	return {
    survivors: store.survivors.survivors,
    isSigned: store.survivors.isSigned,
    mySurvivor: store.survivors.mySurvivor
  }
}
export default connect(mapStateToProps)(SurvivorListPage)
