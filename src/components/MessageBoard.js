import React, { Component } from 'react';
import { setCurrentChannel, addUserToChannel } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MapMessages from './MapMessages';
import MessageBar from './MessageBar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MessageBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberToAdd: ""
    }

    this.renderChannelName=this.renderChannelName.bind(this)
    this.handleMemberChange=this.handleMemberChange.bind(this)
    this.addUser=this.addUser.bind(this)
    this.removeUser=this.removeUser.bind(this)
  }

  addUser() {
    if (this.state.memberToAdd === "") {
      return
    }
    const userToAdd = this.props.users.find( (user) => {
      return user.name == this.state.memberToAdd
    })
    console.log(this.props.currentChannel.cID,[userToAdd])
    this.props.addUserToChannel(this.props.currentChannel.cID,[userToAdd.uID])
  }

  removeUser() {
    // this.props.removeUserFromChannel(this.props.currentChannel.cID,this.props.auth)
    console.log(this.props.auth)
  }

  handleMemberChange(event) {
    this.setState({ memberToAdd: event.target.value })

  }

  renderChannelName() {
    const channelType = this.props.currentChannel.type
    if (channelType === "dm" || channelType === "DM") {
      return <div>Message with {this.props.currentChannel.name}</div>
    } else {
      return <div>#{this.props.currentChannel.name}</div>
    }
  }

  renderGroupFields() {
    const channelType = this.props.currentChannel.type
    if (channelType === "channel") {
    return (
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <span className='nav-link'>
            <select value={this.state.memberToAdd} onChange={this.handleMemberChange}>
              <option value="">None</option>
              {
                this.props.users.map( (user) => {
                  return (
                    <option key={user.uID} className="members" value={user.name}>{user.name}</option>
                  )
                })
              }
            </select>
          </span>
        </li>
        <li className='nav-item'>
          <span className='nav-link'><a onClick={this.addUser} href="#">Invite a new member <FontAwesomeIcon icon='user-plus' /></a></span>
        </li>
        <li className='nav-item'>
          <span className='nav-link'><a onClick={this.removeUser} href="#">Leave this channel <FontAwesomeIcon icon='user-times' /></a></span>
          </li>
      </ul>
    )
  }
}

	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-lg navbar-light bg-light'>
					<span className='navbar-brand'>{this.renderChannelName()}</span>
          {this.renderGroupFields()}
				</nav>
				<MapMessages />
				<MessageBar />
			</div>
		);
	};

};

function mapStateToProps( state ) {
	return { currentChannel:state.currentChannel, users:state.userList, currentUser:state.auth }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setCurrentChannel, addUserToChannel }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
