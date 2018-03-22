import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCurrentChannelMessages, setCurrentChannel, socketMessage } from '../actions';
import { bindActionCreators } from "redux";
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

class MapMessages extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		socket.on('receive message', (inboundMessage) => {
			this.props.socketMessage(inboundMessage)
			console.log('inbound received');
		})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.currentChannel.cID !== this.props.currentChannel.cID){
			console.log('joining room...')
			socket.emit('leave room', {room: this.props.currentChannel.cID});
			socket.emit('room', {room: nextProps.currentChannel.cID});
		}
	}

	componentWillMount() {

		if (localStorage.getItem('currentChannel')) {
			const lastChannel = JSON.parse(localStorage.getItem("currentChannel"))
			this.props.setCurrentChannel(lastChannel, () => {
				this.props.fetchCurrentChannelMessages(lastChannel.cID);
			})
		}
	}

	convertTime (timestamp) {
		let date = new Date(timestamp);
		let options = {
			weekday: "long", year: "numeric", month: "short",
			day: "numeric", hour: "2-digit", minute: "2-digit"
		};
		return date.toLocaleTimeString("en-us", options);
	};

	render() {
		return this.props.messageList.slice(0).reverse().map((message, index) => {
	//TODO: Ashleys code below. Discuss the best option.
    // const reverseSortMessageList = this.props.messageList.slice(0).sort( (a,b) => {
    //   return a.timestamp-b.timestamp
    // })
    // console.log(reverseSortMessageList)
	// 	return reverseSortMessageList.map((message, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(MapMessages);
