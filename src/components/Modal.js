import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { fetchUserList, createNewChannel, fetchCurrentChannelMessages, setCurrentChannel } from '../actions';
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

  handleSubmit(event) {
    event.preventDefault();
    const userList = this.state.membersList.map( member => {
      let oneUser = this.props.users.find( user => {
        return user.name === member
      })
      return oneUser.uID
    })
    const channelObject = {
      name: this.state.name,
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

    this.props.createNewChannel(channelObject).then(()=> {
      this.props.fetchCurrentChannelMessages(this.props.currentChannel)
      this.deactivateModal()
    })

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
                  <input type="text" placeholder="# e.g. general" className="" value={this.state.name} onChange={this.handleNameChange} />
                </div>
              </label>
            </div>
            <div>
              <label className="">Purpose:
                <div className="">
                  <input type="text" placeholder="What the channel is about" className="" value={this.state.purpose} onChange={this.handlePurposeChange} />
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
            <li key={index}>{member}<button type="button" value={member} onClick={this.handleDelete}>remove</button></li>
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

    // const AlternateLocationAriaModal = AriaModal.renderTo(
    //   '#main'
    // );

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
          <div className="modal-body">
            {this.renderType()}
            <form>
              <div>
                {this.renderGroupFields()}
                <label>Add member:</label>
                <div>
                  <select value={this.state.members} onChange={this.handleMemberChange}>
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
              <div className="footer">
              <button className="" onClick={this.handleSubmit}>
                Create
              </button>
              <button className="" onClick={this.deactivateModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
    </AriaModal>
  : false;

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
      <div>
        <FontAwesomeIcon icon='plus' onClick={this.activateModal}>
          activate modal
        </FontAwesomeIcon>
        {modal}
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
  return { channels: state.channels, users: state.userList, currentChannel:state.currentChannel };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentChannelMessages, fetchUserList, createNewChannel, setCurrentChannel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
