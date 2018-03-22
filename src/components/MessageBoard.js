import React, { Component } from 'react';
import { fetchChannels, setCurrentChannel, addUserToChannel, removeSelfFromChannel, fetchCurrentChannelMessages, fetchCurrentChannelUsers } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SingleMessage from './SingleMessage';
import MessageBar from './MessageBar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MessageBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberToAdd: "",
      update: true
    }

    this.renderChannelName=this.renderChannelName.bind(this)
    this.handleMemberChange=this.handleMemberChange.bind(this)
    this.addUser=this.addUser.bind(this)
    this.removeSelf=this.removeSelf.bind(this)
  }

  componentDidMount() {
    this.props.fetchCurrentChannelUsers(this.props.currentChannel.cID)
  }

  addUser() {
    if (this.state.memberToAdd === "") {
      return
    }
    const userToAdd = this.props.users.find( (user) => {
      return user.name == this.state.memberToAdd
    })
    this.props.addUserToChannel(this.props.currentChannel.cID,[userToAdd.uID]).then(res => {
      this.props.fetchCurrentChannelUsers(this.props.currentChannel.cID)
    })
  }

  removeSelf() {
    this.props.removeSelfFromChannel(this.props.currentChannel.cID).then( res => {
      this.props.fetchChannels()
      this.props.setCurrentChannel(this.props.channels[0], () => {
        this.props.fetchCurrentChannelMessages(this.props.channels[0].cID)
        this.props.fetchCurrentChannelUsers(this.props.channels[0].cID)
      })
    })
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
          <span className='nav-link'><a onClick={this.removeSelf} href="#">Leave this channel <FontAwesomeIcon icon='user-times' /></a></span>
        </li>
        <div>
          <ul><strong>Channel Members:</strong>
            {
              this.props.channelUsers.map( (user) => {
                return (
                  <li key={user.uID} className="users">{user.user}</li>
                )
              })
            }
          </ul>
        </div>
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
				<SingleMessage />
				<MessageBar />
			</div>
		);
	};

};

function mapStateToProps( state ) {
	return { currentChannel:state.currentChannel, users:state.userList, currentUser:state.auth, channels:state.channels, channelUsers:state.channelUsers}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchChannels, setCurrentChannel, addUserToChannel, removeSelfFromChannel, fetchCurrentChannelMessages, fetchCurrentChannelUsers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
