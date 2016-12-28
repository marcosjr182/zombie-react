import React from 'react';
import Survivor from './survivor';
import { connect } from 'react-redux';
import { getSurvivorById } from '../selectors/survivor-list-selector';

class SurvivorCard extends React.Component {
  componentWillMount() {
    this.props.getSurvivor(this.props.id)
  }

  render(){
    const { survivor } = this.props;
    <Survivor {...survivor} />
  }
}

const mapStateToProps = (store, { id }) => ({
  survivor: 'a'// getSurvivorById(store, id)
})

export default connect(mapStateToProps)(SurvivorCard)
