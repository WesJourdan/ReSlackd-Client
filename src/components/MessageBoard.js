import React, { Component } from 'react';
import SingleMessage from './SingleMessage';
import MessageBar from './MessageBar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class MessageBoard extends Component {
	
	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-lg navbar-light bg-light'>
					<span className='navbar-brand'>#memelyfe</span>
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

export default MessageBoard;
