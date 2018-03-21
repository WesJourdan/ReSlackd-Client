import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels } from '../actions';
import io from 'socket.io-client';//for socket test
const socket = io('http://localhost:8080');

class MessageBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};

		this.onInputChange = this.onInputChange.bind(this)
		this.onSubmitMessage = this.onSubmitMessage.bind(this)
	}
	
	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
			// this is where we would emit a "user is typing" event.
		}
	}

	onSubmitMessage(event) {
		event.preventDefault();
		const currentTime = new Date();
		const post = {
			cID: this.props.currentChannel.cID,
			uID: this.props.auth[0].uID,//TODO:find id of current user from the store
			text: this.state.text,
			timestamp: currentTime.getTime(),
			name: this.props.auth[0].name, //TODO: find name of current user
			imageURL: this.props.auth[0].imageURL, //TODO: get url for profile pic
			enabled: true
		}
		console.log('auth ', this.props.auth);
		  
		this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)
		socket.emit('chat message', post )// TODO: add 
		this.setState({ text: '' });
	}

	render() {
		return (

			<div>
				<form onSubmit={this.onSubmitMessage}>

					<input
						type="text"
						value={this.state.text}
						placeholder="send a message"
						onChange={this.onInputChange}
					/>

				</form>
			</div>
		)
	}
}

function mapStateToProps( state ) {
	return { currentChannel: state.currentChannel, channels: state.channels, auth: state.auth }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postMessage }, dispatch);
}

export default connect(mapStateToProps, actions)(MessageBar);
