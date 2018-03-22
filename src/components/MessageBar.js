import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels } from '../actions';
import io from 'socket.io-client';//for socket test
import TextareaAutosize from 'react-autosize-textarea';
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

  handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			const currentTime = new Date();
			const post = {
				cID: this.props.currentChannel.cID,
				uID: this.props.auth[0].uID,
				text: this.state.text,
				timestamp: currentTime.getTime(),
				name: this.props.auth[0].name,
				imageURL: this.props.auth[0].imageURL,
				enabled: true
			}
			this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)
			socket.emit('chat message', post )
			this.setState({ text: '' });
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

		this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)
		socket.emit('chat message', post )
		this.setState({ text: '' });
	}

  render() {
		return (
			<div className="card" id="message-bar">
				<div className="form-group  ml-1 pt-2" onKeyPress={this.handleKeyPress.bind(this)}>
					<TextareaAutosize
						className="form-control"
						maxRows={6}
						type="text"
						value={this.state.text}
						placeholder="send a message"
						onChange={this.onInputChange}
					>
					</TextareaAutosize>
				</div>
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
