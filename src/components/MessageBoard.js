import React, { Component } from "react";
import SingleMessage from './SingleMessage';
import MessageBar from './MessageBar';

class MessageBoard extends Component {
	
	render() {
		return (
			<div>
				<SingleMessage />
				<MessageBar />
			</div>
		);
	};

};

export default MessageBoard;
