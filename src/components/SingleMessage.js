import React, { Component } from "react";
import { connect } from 'react-redux';
const DUMMY = require('../DUMMY_DATA');

class SingleMessage extends Component {

	convertTime (timestamp) {
		let date = new Date(timestamp);
		let options = {
			weekday: "long", year: "numeric", month: "short",
			day: "numeric", hour: "2-digit", minute: "2-digit"
		};
		return date.toLocaleTimeString("en-us", options); 
	};

	render() {
		return DUMMY.MESSAGES.map(	message => {
			let newMessage = (
				<div>
					<img src={message.imageURL}></img>
					{message.username}
					{message.text}
					{this.convertTime(message.timestamp)}
				</div>
			)

			return newMessage
		});
	};


	// render() {
	// 	return this.props.messages.map((message, index) => {
	// 		let newMessage = (
	// 			<div>
	// 				<img src={message.imageURL}></img>
	// 				{message.username}
	// 				{message.text}
	// 				{this.convertTime(message.timestamp)}
	// 			</div>
	// 		)

	// 		return newMessage
	// 	});
	// };
};

function mapStateToProps({ messages }) {
	return { messages }
};

export default connect(mapStateToProps)(SingleMessage);