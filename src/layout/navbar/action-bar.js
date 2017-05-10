import React from 'react'
import { connect } from 'react-redux'

import { signOut, updateUser } from '../../ducks/my-survivor'
import { retrieveLocation } from '../../actions/survivor-actions'
import { parseSurvivor } from '../../selectors/survivor-selector'

import Button from '../../ui/button'

const ActionBar = ({ user, signOut, updateLocation }) =>
  <div className="col-xs-12 col-sm-4 text-right">
    <Button
      onClick={ () => updateLocation(user) }
      text='Update My Location' />
    <Button onClick={signOut} text='Sign Out' />
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
