import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels } from '../actions';
import io from 'socket.io-client';//for socket test
//import socket from 'socket.io';//for socket test


class MessageBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			messages: props.messages,
			connected: false
		};
		this.onInputChange = this.onInputChange.bind(this)
		this.onSubmitMessage = this.onSubmitMessage.bind(this)
		this.handleMessageEvent = this.handleMessageEvent.bind(this)
	}

	componentWillMount() {
		if(!(this.state.connected)){
			this.props.fetchChannels()
			socket.emit('subscribe', {channel: this.props.channels})//not sure what our data looks like here
        		this.setState({connected: true})
		}
		
		// this.props.setCurrentChannel(this.props.channels[0],() => {})
	}
	//socket testing data
	componentDidMount(){
		console.log('did mount');
		this.handleMessageEvent();
	}
	handleMessageEvent(){
		//var socket = io();
		io().on('chat message', (inboundMessage) => {
			this.props.newMessage({user: 'test_user', message: inboundMessage}) 
			console.log('received message', inboundMessage)
		})
	}
	//end socket test

	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		var socket = io();
		socket.emit('broadcast', 'hello friends!');
		}
	}

	onSubmitMessage(event) {
		var socket = io();
		event.preventDefault();
		console.log(this.props)
		socket.emit('chat message', { message: this.state.input })// send the message to the server and/or socket
		this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)

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
	return { currentChannel: state.currentChannel, channels: state.channels }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postMessage }, dispatch);
}

export default connect(mapStateToProps, actions)(MessageBar);
