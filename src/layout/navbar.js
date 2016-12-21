import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { updatableSurvivor, stringifyItems } from '../helpers';
import MyStats from '../components/my-stats';
import AddSurvivorModal from './add-survivor-modal';
import SignInForm from '../forms/sign-in-form';
import {addSurvivor, updateLocation, signIn, signOut} from '../actions/survivor-actions';


class Navbar extends React.Component {
  constructor() {
    super();
    this.handleAddSurvivorSubmit = this.handleAddSurvivorSubmit.bind(this);

    this._signOut = this._signOut.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
  }

  render() {
    const navbarActions = () => {
      if (!this.props.isSigned){
        return (
          <div className="col-xs-12 col-sm-4 text-right">
            <SignInForm />
            <AddSurvivorModal handleSubmit={this.handleAddSurvivorSubmit}/>
          </div>
        );
      } else {
        return (
          <div className="col-xs-12 col-sm-4 text-right">
            <Link className="btn btn-default btn-navbar" onClick={this._updateLocation}>Update My Location</Link>
            <Link className="btn btn-default btn-navbar" onClick={this._signOut}>Sign Out</Link>
          </div>
        );
      }
    }


    return (
      <div className="col-xs-12 navbar">
        <MyStats user={this.props.mySurvivor} />
        { navbarActions() }
      </div>
    )
  }

  _updateLocation(e) {
    e.preventDefault();
    this.props.dispatch(updateLocation(this.props.mySurvivor));
  }

  _signOut() {
    this.props.dispatch(signOut());
  }

  handleAddSurvivorSubmit(values) {
    this.props.dispatch(addSurvivor({
      ...updatableSurvivor(values),
      items: stringifyItems(values)
    }))
  }

  handleSignInSubmit(values) {
    this.props.dispatch(signIn(values.id));
  }
}

const mapStateToProps = store => {
  return {
    mySurvivor: store.survivors.mySurvivor,
    isSigned: store.survivors.isSigned
  }
}
export default connect(mapStateToProps)(Navbar)
