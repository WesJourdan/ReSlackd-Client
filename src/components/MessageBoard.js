import React, { Component } from 'react';
import { setCurrentChannel } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SingleMessage from './SingleMessage';
import MessageBar from './MessageBar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MessageBoard extends Component {
  constructor(props) {
    super(props);

    this.renderChannelName=this.renderChannelName.bind(this)
  }

  renderChannelName() {
    const channelType = this.props.currentChannel.type
    if (channelType == "dm") {
      return <div>Message with {this.props.currentChannel.name}</div>
    } else {
      return <div>#{this.props.currentChannel.name}</div>
    }

  }

	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-lg navbar-light bg-light'>
					<span className='navbar-brand'>{this.renderChannelName()}</span>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<span className='nav-link'>Invite a new member <FontAwesomeIcon icon='user-plus' /></span>
						</li>
						<li className='nav-item'>
							<span className='nav-link'>Leave this channel <FontAwesomeIcon icon='user-times' /></span>
						</li>
					</ul>
				</nav>
				<SingleMessage />
				<MessageBar />
			</div>
		);
	};

};

function mapStateToProps( state ) {
	return { currentChannel:state.currentChannel }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setCurrentChannel }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
