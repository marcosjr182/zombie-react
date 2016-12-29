import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import AddSurvivorModal from './add-survivor-modal'
import Properties from '../components/properties'
import SignInForm from '../forms/sign-in-form'

import { updateLocation, signOut } from '../ducks/my-survivor'
import { parseSurvivor, updatableSurvivor } from '../selectors/survivor-selector'

const UserStats = ({ name, items }) =>
  name
    ? <div className="col-xs-12 my-stats">
        <div className="col-xs-12 col-md-5 name"> {name} </div>
        <div className="col-xs-12 col-sm-7">
          <Properties items={items} columns='3' />
        </div>
      </div>
    : null

const UserActions = ({ handleUpdateLocation, handleSignOut }) =>
  <div className="col-xs-12 col-sm-4 text-right">
    <Link className="btn btn-default btn-navbar" onClick={handleUpdateLocation}>Update My Location</Link>
    <Link className="btn btn-default btn-navbar" onClick={handleSignOut}>Sign Out</Link>
  </div>

const PublicActions = () =>
  <div className="col-xs-12 col-sm-4 text-right">
    <SignInForm />
    <AddSurvivorModal />
  </div>

const NavbarActions = ({ isSigned, btnHandlers }) =>
  (!isSigned)
    ? <PublicActions  />
    : <UserActions {...btnHandlers} />

const Navbar = ({ mySurvivor, isSigned, handleUpdateLocation, handleSignOut }) =>
  <div className="col-xs-12 navbar">
    <div className='col-xs-12 col-sm-8'>
      <UserStats {...mySurvivor} />
    </div>
    <NavbarActions btnHandlers={handleUpdateLocation, handleSignOut}
                   isSigned={isSigned} />
  </div>

const mapDispatchToProps = (dispatch, { mySurvivor }) => ({
  handleSignOut(){
    dispatch(signOut())
  },
  handleUpdateLocation(){
    dispatch(updateLocation(updatableSurvivor(mySurvivor)))
  }
})

const mapStateToProps = store => {
  return {
    mySurvivor: parseSurvivor(store.survivors.mySurvivor),
    isSigned: store.survivors.isSigned
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
