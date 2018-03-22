import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { fetchUserList, createNewChannel, fetchCurrentChannelMessages, setCurrentChannel, fetchChannels, fetchDirectMessages } from '../actions';
import './App.css';
import AriaModal from '../../node_modules/react-aria-modal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Modal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalActive: false,
      name: '',
      purpose: '',
      member: '',
      membersList: [],
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePurposeChange = this.handlePurposeChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMembers = this.renderMembers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState({
      modalActive: false,
      name: '',
      purpose: '',
      member: '',
      membersList: [],
    })
  };

  getApplicationNode = () => {
    return document.getElementById('application');
  };

  componentDidMount() {
    this.props.fetchUserList()
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePurposeChange(event) {
    this.setState({ purpose: event.target.value });
  }

  handleMemberChange(event) {
    if (event.target.value === "") {
      console.log("none")
      return
    }
  //adds a user to the userlist for channel/DM creation
    this.setState({ member: event.target.value }, () => {
      if (this.props.messageType === "channel") {
        const newList = this.state.membersList.concat([this.state.member])
        this.setState({ membersList: newList })
      }
      else {
        const newList = [this.state.member]
        this.setState({ membersList: newList })
      }
    })
  }

//deletes a user from the list of users to be added to a new channel
  handleDelete(event) {
    const newList = this.state.membersList.filter( (member) => {
      return member !== event.target.value
    })
    this.setState({ membersList: newList })
  }

  //prevents calling onClose when clicking on the inner modal box.
  handleOnClick(event) {
    event.stopPropagation();
  }

//creates a channel or DM
  handleSubmit(event) {
    event.preventDefault();
    const userList = this.state.membersList.map( member => {
      let oneUser = this.props.users.find( user => {
        return user.name === member
      })
      return oneUser.uID
    })
    const channelName = this.state.name ? this.state.name : this.state.membersList[0]
    const channelObject = {
      name: channelName,
      purpose: this.state.purpose,
      type: this.props.messageType,
      users: userList
    }

    if (channelObject.type === "channel") {
      if (channelObject.name === "") {
          alert("Channel must have a name");
          return false;
      }
      else if (!channelObject.users.length) {
        alert("Please add at least one member");
        return false;
      }
    } else {
      if (!channelObject.users.length) {
        alert("Please select a user to message");
        return false;
      }
    }

    this.props.createNewChannel(channelObject).then((cID)=> {
      this.props.fetchChannels()
      this.props.fetchDirectMessages()
      this.props.fetchCurrentChannelMessages(this.props.channels[0].cID)
    })
    this.deactivateModal()
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
            <h2>Create a direct message with another user</h2>
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
            <div>
              <label className="">Name:
                <div className="">
                  <input type="text" placeholder="# e.g. general" className="input-group-text modal-input" value={this.state.name} onChange={this.handleNameChange} />
                </div>
              </label>
            </div>
            <div>
              <label className="">Purpose:
                <div className="">
                  <input type="text" placeholder="What the channel is about" className="input-group-text modal-input" value={this.state.purpose} onChange={this.handlePurposeChange} />
                </div>
              </label>
            </div>
          </div>
        )
      default:
        return;
    }
  }

  renderMembers() {
    if (this.props.messageType === "channel") {
      return(
      <div>Users to add:
        {this.state.membersList.map( (member, index) => {
          return (
            <li className="modal-list" key={index}> {member} <button className="modal-delete Modal-text btn btn-link" type="button" value={member} onClick={this.handleDelete}>&times;</button></li>
          )
        })
        }
      </div>
    )
    } else {
    return
    }
  }


  render() {

    const modal = this.state.modalActive
      ? <AriaModal
        titleText="demo one"
        onExit={this.deactivateModal}
        getApplicationNode={this.getApplicationNode}
        underlayStyle={{
          background: '#fff'
        }}
        verticallyCenter={true}
        >
        <div id="demo-one-modal">
          <div className="modal-body Header-bar Modal-text">
            {this.renderType()}
            <form>
              <div>
                {this.renderGroupFields()}
                <label>Add member:</label>
                <div>
                  <select className="custom-select" value={this.state.members} onChange={this.handleMemberChange}>
                    <option value="">None</option>
                    {
                      this.props.users.map( (user) => {
                        return (
                          <option key={user.uID} className="members" value={user.name}>{user.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </form>
            {this.renderMembers()}
            <div className="footer flex mt-2">
              <button className="btn mr-1" onClick={this.handleSubmit}>
                Create
              </button>
              <button className="btn" onClick={this.deactivateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </AriaModal>
  : false;

    return (
      <div>
        <FontAwesomeIcon icon='plus' onClick={this.props.auth ? this.activateModal : null}>
          activate modal
        </FontAwesomeIcon>
        {modal}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth:state.auth, channels: state.channels, users: state.userList, currentChannel: state.currentChannel };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentChannelMessages, fetchUserList, createNewChannel, setCurrentChannel, fetchChannels, fetchDirectMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
