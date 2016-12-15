import React from 'react';
import Survivor from '../components/survivor';

import { connect } from 'react-redux';
import { fetchSurvivors } from '../actions/survivor-actions';

class SurvivorListPage extends React.Component {
	constructor() {
		super()
    this._getSurvivor = this._getSurvivor.bind(this);
  }

	render() {
    return (
      <div className="col-xs-12 survivor-list">
        { this.props.survivors.map(this._getSurvivor) }
      </div>
    )
  }

	_getSurvivor(survivor) {
    return (<Survivor
				 			{...survivor}
              key={survivor.id} />
		);
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
