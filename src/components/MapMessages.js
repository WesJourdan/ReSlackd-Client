import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCurrentChannelMessages, setCurrentChannel, socketMessage, fetchCurrentChannelUsers } from '../actions';
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
				this.props.fetchCurrentChannelMessages(lastChannel.cID).then(res => {
          this.props.fetchCurrentChannelUsers(lastChannel.cID)
      })
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
    const reverseSortMessageList = this.props.messageList.slice(0).sort( (a,b) => {
      return a.timestamp-b.timestamp
    })
		return reverseSortMessageList.map((message, index) => {
			let newMessage = (
				<div key={index}>
					<div className="card border-0 mb-1 ml-2 mx-1" id="card">
						<div className="card-text pl-2 pt-3"><img src={message.imageURL} alt={message.username} className="icon ml-2 mr-2"></img><strong>{message.name}</strong><span className="float-right">{this.convertTime(message.timestamp)}</span><p className="ml-5">{message.text}</p></div>		
					</div>
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
	return bindActionCreators({ fetchCurrentChannelMessages, setCurrentChannel, socketMessage, fetchCurrentChannelUsers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapMessages);
