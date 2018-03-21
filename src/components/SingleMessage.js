import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCurrentChannelMessages, setCurrentChannel, socketMessage } from '../actions';
import { bindActionCreators } from "redux";
import io from 'socket.io-client';//for socket test
const socket = io();

class SingleMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		}
		socket.on('receive message', (inboundMessage) => {
			this.props.socketMessage(inboundMessage)
			console.log('inbound received');
			
		})
		//this.socket = io();
	}


	updateMessageFromSockets(inboundMessage) {
		this.setState({message: inboundMessage})
	}
	//TODO: Should we put this here?
	// componentDidMount() {
    // const lastChannel = JSON.parse(localStorage.getItem("currentChannel"))
    // this.props.setCurrentChannel(lastChannel, () => {
    //   this.props.fetchCurrentChannelMessages(lastChannel.cID);
    // })
	//  }
	//TODO: remove this if the socket above works. trial placement between these two
	// componentDidMount(){
	// 	console.log(this.props);
	// 	console.log('received message', inboundMessage)
	// }

	convertTime (timestamp) {
		let date = new Date(timestamp);
		let options = {
			weekday: "long", year: "numeric", month: "short",
			day: "numeric", hour: "2-digit", minute: "2-digit"
		};
		return date.toLocaleTimeString("en-us", options);
	};

	render() {
		return this.props.messageList.map((message, index) => {
			let newMessage = (
				<div key={index}>
					<img src={message.imageURL} alt={message.username} className="icon"></img>
					{message.name}
					{message.text}
					{this.convertTime(message.timestamp)}
				</div>
			)
			return newMessage
		});
	};
};

function mapStateToProps( state ) {
	return { messageList:state.messageList, currentChannel:state.currentChannel }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchCurrentChannelMessages, setCurrentChannel, socketMessage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessage);
