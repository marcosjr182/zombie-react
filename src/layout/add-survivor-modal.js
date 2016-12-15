import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import AddSurvivorForm from '../forms/add-survivor-form';

const modalStyle = {
  overlay: 	{
    background: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    position: 'relative',
    margin: 'auto',
    left: 'auto',
    right: 'auto'
  }
}

export default class AddSurvivorModal extends React.Component {
  constructor(){
    super();
    this.state = { modalIsOpen: false }
    this.toggleModal = this.toggleModal.bind(this);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='add-survivor-modal'>
        <Link onClick={this.toggleModal} className="btn btn-default btn-navbar">New Survivor</Link>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
          contentLabel="New Survivor"
          style={modalStyle}>
          <h3 className="col-xs-12">New Survivor</h3>
          <AddSurvivorForm onSubmit={handleSubmit} />
        </Modal>
      </div>
    )
  }

  toggleModal() {
    this.setState({modalIsOpen: (!this.state.modalIsOpen)});
  }
}
