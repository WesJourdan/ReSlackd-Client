import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels, socketMessage } from '../actions';
import io from 'socket.io-client';//for socket test


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

		const socket = io();
	}

	componentWillMount() {
		
		if(!(this.state.connected)){
			this.props.fetchChannels()
			socket.emit('subscribe', {channel: this.props.channels})//not sure what our data looks like here
        		this.setState({connected: true})
		}
	}
	//socket testing data
	componentDidMount(){
		console.log('did mount');
		this.handleMessageEvent();
	}
	handleMessageEvent(){
		socket.on('chat message', (inboundMessage) => {
			this.props.socketMessage(inboundMessage) 
			console.log('received message', inboundMessage)
		})
	}
	//end socket test

	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		
		//socket.emit('broadcast', 'hello friends!');
		}
	}

	onSubmitMessage(event) {
		//var socket = io();
		event.preventDefault();
		console.log(this.props)
		console.log(this.state.connected);
		
		this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)
		socket.emit('chat message', { message: this.state.text, user: '123' })// send the message to the server and/or socket
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
