import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import MyStats from '../components/my-stats';
import AddSurvivorForm from './add-survivor-form';
import {updateSurvivor, fetchLocation, signIn, signOut} from '../actions/survivor-actions';

@connect((store) => {
  return ({
    mySurvivor: store.survivors.mySurvivor,
    isSigned: store.survivors.isSigned
  })
})
export default class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      survivorId: ''
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this._signOut = this._signOut.bind(this);
    this._signInSubmit = this._signInSubmit.bind(this);
    this._updateLocation = this._updateLocation.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.mySurvivor.lonlat !== newProps.mySurvivor.lonlat){
      this.props.dispatch(updateSurvivor(newProps.mySurvivor));
    }
  }

  render() {
    const modalStyle = {
      overlay: 	{
        background: 'rgba(0, 0, 0, 0.75)'
      },
      content: {
        position: 'relative',
        width: '75%',
        margin: 'auto'
      }
    }

    const publicNav = () => {
      if (!this.props.isSigned){
        return (
          <div className="col-sm-6 text-right">
            <form className="navbar-form" onSubmit={this._signInSubmit}>
              <input className="form-control" type="text" onChange={this.handleChange} value={this.state.survivorId} />
              <input className="btn btn-default btn-navbar" type="submit" value="Sign In" />
            </form>
            <Link onClick={this.toggleModal} className="btn btn-default btn-navbar">New Survivor</Link>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.toggleModal}
              contentLabel="New Survivor"
              style={modalStyle}>
              <h3 className="col-xs-12">New Survivor</h3>
              <AddSurvivorForm toggleModal={this.toggleModal} />
            </Modal>
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
      if (this.props.isSigned){
        return ( <MyStats {...this.props.mySurvivor} /> );
      }
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
    this.props.dispatch(fetchLocation(this.props.mySurvivor));
  }

  _signInSubmit(e) {
    e.preventDefault();
    this.props.dispatch(signIn(this.state.survivorId));
  }

  _signOut() {
    this.props.dispatch(signOut());
  }

  handleChange(event) {
    this.setState({survivorId: event.target.value});
  }

  toggleModal() {
    this.setState({modalIsOpen: (!this.state.modalIsOpen)});
  }

}
