import React, { Component } from "react";
import { connect } from 'react-redux';

const MESSAGES_DUMMY_DATA = [
	{ username: 'Wes', userId: '213', text: 'Hey guys!', timestamp: new Date(), image:'https://furtaev.ru/preview/user_3_small.png' },
	{ username: 'Justin', userId: '234', text: 'Hello.', timestamp: new Date(), image: 'https://furtaev.ru/preview/user_3_small.png' },
	{ username: 'Austin', userId: '432', text: 'Howdy!', timestamp: new Date(), image: 'https://furtaev.ru/preview/user_3_small.png' },
	{ username: 'Ashley', userId: '123', text: 'Morning!', timestamp: new Date(), image: 'https://furtaev.ru/preview/user_3_small.png' },
	{ username: 'John Doe', userId: '543', text: 'Huh?', timestamp: new Date(), image: 'https://furtaev.ru/preview/user_3_small.png' }
]

class SingleMessage extends Component {

	render() {
		return this.props.messages.map((message, index) => {
			let newMessage = (
				<div>
				</div>
			)
			
			return newMessage
		});
	};
};

function mapStateToProps({ messages }) {
	return { messages }
};

export default connect(mapStateToProps)(SingleMessage);