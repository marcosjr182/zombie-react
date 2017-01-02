import React from 'react'
import { connect } from 'react-redux'

import AddSurvivorModal from './add-survivor-modal'
import Properties from '../components/properties'
import SignInForm from '../forms/sign-in-form'

import { parseSurvivor } from '../selectors/survivor-selector'
import ActionBar from './navbar/action-bar'

const UserStats = (user) =>
  (user)
    ? <div className="col-xs-12 my-stats">
        <div className="col-xs-12 col-md-5 name"> {user.name} </div>
        <div className="col-xs-12 col-sm-7">
          <Properties items={user.items} columns='3' />
        </div>
      </div>
    : null

const prepareActions = (isSigned) =>
  (isSigned)
    ? <ActionBar test={33} />
    : <div className="col-xs-12 col-sm-4 text-right">
        <SignInForm />
        <AddSurvivorModal />
      </div>


const Navbar = ({ mySurvivor, isSigned }) =>
  <div className="col-xs-12 navbar">
    <div className='col-xs-12 col-sm-8'>
      <UserStats {...mySurvivor} />
    </div>

    { prepareActions(isSigned) }
  </div>


const mapStateToProps = ({ survivors }) => {
  return {
    mySurvivor: parseSurvivor(survivors.mySurvivor),
    isSigned: survivors.isSigned
  }
}

export default connect(mapStateToProps)(Navbar)
