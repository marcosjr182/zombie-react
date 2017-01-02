import React from 'react'
import { connect } from 'react-redux'

import { signOut, updateUser } from '../../ducks/my-survivor'
import { retrieveLocation } from '../../actions/survivor-actions'
import { parseSurvivor } from '../../selectors/survivor-selector'

const ActionBar = ({ user, signOut, updateLocation }) =>
  <div className="col-xs-12 col-sm-4 text-right">
    <button
      className="btn btn-default btn-navbar"
      onClick={ () => updateLocation(user) }>
      Update My Location
    </button>
    <button
      className="btn btn-default btn-navbar"
      onClick={signOut}>
      Sign Out
    </button>
  </div>

const mapDispatchToProps = (dispatch) => ({
  signOut,
  updateLocation(user){
    dispatch(retrieveLocation())
      .then((action) =>
        dispatch(updateUser({...user, lonlat: action.payload }))
      )
  }
})

const mapStateToProps = ({ survivors }) => ({
  user: parseSurvivor(survivors.mySurvivor)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionBar)
