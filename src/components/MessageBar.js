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
			text: '',
			messages: props.messages,
			connected: false
		};

		this.onInputChange = this.onInputChange.bind(this)
		this.onSubmitMessage = this.onSubmitMessage.bind(this)
		//this.socket = io();
	}
	//TODO: figure out if we want to keep the code below or move to another page
	// componentWillMount() {
		
	// 	if(!(this.state.connected)){
	// 		this.props.fetchChannels()
	// 		socket.emit('subscribe', {channel: this.props.channels})//not sure what our data looks like here
    //     		this.setState({connected: true})
	// 	}
	// }
	//socket testing data
	

	//TODO: code to implement if we meet our mvp and can do extensions
	// currentlyTyping() {
	// 	this.setState({currentlyTyping: this.props.currentUser})
	// }
	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		//socket.emit('broadcast', 'hello friends!');
		}
	}

	// componentDidMount() {
	// 	socket.on('receive message', (inboundMessage) => {
	// 		this.props.socketMessage(inboundMessage)
	// 		console.log('inbound received');	
	// 	})
	// }
	

	onSubmitMessage(event) {
		// const socket = io(this.state.endpoint)
		event.preventDefault();
		const currentTime = new Date();
        const post = {
            cID: this.props.currentChannel.cID,
            uID: '123',//TODO:find id of current user from the store
            text: this.state.text,
			timestamp: currentTime.getTime(),
			name: 'name', //TODO: find name of current user
			img: 'url', //TODO: get url for profile pic
            enabled: true
		  }
		console.log(post);
		  
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
	return { currentChannel: state.currentChannel, channels: state.channels }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postMessage }, dispatch);
}

export default connect(mapStateToProps, actions)(MessageBar);
