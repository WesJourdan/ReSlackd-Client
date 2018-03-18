import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { fetchUserList } from '../actions';
import './App.css';
import Channels from './Channels';
const DUMMY = require('../DUMMY_DATA');

class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      purpose: '',
      member: '',
      membersList: [],
      // formErrors: {name: '', members: ''},
      // nameValid: false,
      // membersValid: false,
      // formValid: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePurposeChange = this.handlePurposeChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserList()
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePurposeChange(event) {
    this.setState({ purpose: event.target.value });
  }

  handleMemberChange(event) {
    this.setState({ member: event.target.value })
  }

  handleAddUser(event) {
    event.preventDefault();
    const newList = this.state.membersList.concat([this.state.member])
    this.setState({ membersList: newList })
  };


  //prevents calling onClose when clicking on the inner modal box.
  handleOnClick(event) {
    event.stopPropagation();
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO add an action to post the new DM or channel to the database and then display the contents of the new DM/channel in the messages pane
  }

  renderType() {
    switch (this.props.messageType) {
      case null:
        return;
      case "channel":
        return (
          <div>
            <h2>Create a channel</h2>
            <h4>Channels are where your members communicate. They're best when organized around a topic - #general or #random, for example. </h4>
          </div>
        )
      default:
        return (
          <div>
            <h2>Create a direct message</h2>
          </div>
        )
    }
  }

  renderGroupFields() {
    switch (this.props.messageType) {
      case null:
        return;
      case "channel":
        return (
          <div>
            <label className="col-2 col-form-label">Name:
              <div className="col-10">
                <input type="text" placeholder="# e.g. general" className="name" value={this.state.name} onChange={this.handleNameChange} />
              </div>
            </label>
            <label className="col-2 col-form-label">Purpose:
              <div className="col-12">
                <input type="text" placeholder="What the channel is about" className="purpose" value={this.state.purpose} onChange={this.handlePurposeChange} />
              </div>
            </label>
          </div>
        )
      default:
        return;
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 800,
      minHeight: 500,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle} onClick={this.props.onClose}>
        <div className="modal" style={modalStyle} onClick={this.handleOnClick}>
          {this.renderType()}
          <form>
            <div className="form-group row">
              {this.renderGroupFields()}
              <label className="col-2 col-form-label">Add members:</label>
              <div className="col-12">
                <select className="form-control mt-3 mb-2" value={this.state.members} onChange={this.handleMemberChange}>
                  <option className="members" value="none">None</option>
                  {
                    this.props.users.map( (user) => {
                      return (
                        <option key={user.uID} className="members" value={user.name}>{user.name}</option>
                      )
                    })
                  }
                </select><button onClick={this.handleAddUser} >+</button>
              </div>
            </div>
          </form>
          <div>Users to add:
            {this.state.membersList.map( (member, index) => {
              return (
                <li key={index}>{member}</li>
              )
            })
            }
          </div>
          <div className="footer">
            <button className="" onClick={this.props.onClose}>
              Cancel
            </button>
            <button className="" onClick={this.handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return { channels: state.channels, users: state.userList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
