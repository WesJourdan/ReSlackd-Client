import React, { Component } from 'react';
import Modal from './Modal';

class ChannelSettings extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>
          Create a Channel
        </button>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          Create a channel
        </Modal>
      </div>
    );
  }
}

export default ChannelSettings;