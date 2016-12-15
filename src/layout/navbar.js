import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import MyStats from '../components/my-stats';
import AddSurvivorModal from './add-survivor-modal';
import SignInForm from '../forms/sign-in-form';
import {addSurvivor, updateLocation, signIn, signOut} from '../actions/survivor-actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      survivorId: ''
    };

    this.handleAddSurvivorSubmit = this.handleAddSurvivorSubmit.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);

    this._signOut = this._signOut.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
  }

  render() {

    const publicNav = () => {
      if (!this.props.isSigned){
        return (
          <div className="col-sm-6 text-right">
            <SignInForm onSubmit={this.handleSignInSubmit} />
            <AddSurvivorModal handleSubmit={this.handleAddSurvivorSubmit}/>
          </div>
        );
      } else {
        return (
          <div className="col-sm-6 text-right">
            <Link className="btn btn-default btn-navbar" onClick={this._updateLocation}>Update My Location</Link>
            <Link className="btn btn-default btn-navbar" onClick={this._signOut}>Sign Out</Link>
          </div>
        );
      }
    },
    signedUserNav = () => {
      if (this.props.isSigned)
        <MyStats name={this.props.mySurvivor.name}
                 items={this.props.mySurvivor.items} />
    }


    return (
      <div className="col-xs-12 navbar">
        <div className="col-xs-12 col-sm-6"> { signedUserNav() } </div>
        { publicNav() }
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
    const items = `Water:${values.Water};`
                + `Food:${values.Food};`
                + `Ammunition:${values.Ammunition};`
                + `Medication:${values.Medication};`,
    survivor = {
      person: {
        name: values.name,
        age: values.age,
        gender: values.gender
      },
      items: items
    }
    this.props.dispatch(addSurvivor(survivor));
  }

  handleSignInSubmit(values) {
    this.props.dispatch(signIn(values.id));
  }
}

const mapStateToProps = store => {
  return {
    mySurvivor: store.survivors.mySurvivor,
    isSigned: store.survivors.isSigned,
    teste: store.survivors.teste
  }
}

export default connect(mapStateToProps)(Navbar)
