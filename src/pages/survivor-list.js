import React from 'react';
import Survivor from '../components/survivor';

import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

class SurvivorListPage extends React.Component {
	render() {
		const listSurvivors = (survivors) =>
			survivors.map((survivor) => {
			  return (<Survivor	{...survivor} key={survivor.id} />)
			})

    return (
      <div className="col-xs-12 survivor-list">
        { listSurvivors(this.props.survivors) }
      </div>
    )
  }

	componentWillMount(){
    this.props.dispatch(fetchSurvivors());
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
