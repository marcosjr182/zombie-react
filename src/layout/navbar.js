import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AddSurvivorModal from './add-survivor-modal';
import MyStats from '../components/my-stats';
import SignInForm from '../forms/sign-in-form';
import { updateLocation, signOut } from '../actions/survivor-actions';


const navbarActions = ({ isSigned, handleSignOut, handleUpdateLocation }) =>
  (!isSigned)
    ? <div className="col-xs-12 col-sm-4 text-right">
        <SignInForm />
        <AddSurvivorModal />
      </div>
    : <div className="col-xs-12 col-sm-4 text-right">
        <Link className="btn btn-default btn-navbar" onClick={handleUpdateLocation}>Update My Location</Link>
        <Link className="btn btn-default btn-navbar" onClick={handleSignOut}>Sign Out</Link>
      </div>

const Navbar = ({ mySurvivor, isSigned, handleUpdateLocation, handleSignOut }) =>
  <div className="col-xs-12 navbar">
    <MyStats user={mySurvivor} />
    { navbarActions({ isSigned, handleUpdateLocation, handleSignOut }) }
  </div>

const mapDispatchToProps = (dispatch, { mySurvivor }) => ({
  handleSignOut(){
    dispatch(signOut())
  },
  handleUpdateLocation(){
    dispatch(updateLocation(mySurvivor))
  }
})

const mapStateToProps = store => {
  return {
    mySurvivor: store.survivors.mySurvivor,
    isSigned: store.survivors.isSigned
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
