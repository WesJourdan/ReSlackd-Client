import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels } from '../actions';

class MessageBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.onInputChange = this.onInputChange.bind(this)

	}

  componentWillMount() {
    this.props.fetchChannels()
    this.props.setCurrentChannel(this.props.channels[0].cID,() => {})
  }


	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		}
	}

	onSubmitMessage(event) {
		event.preventDefault();
		console.log(this.props)
		// send the message to the server and/or socket
		this.props.postMessage({text:this.state.text}, this.props.currentChannel)

		this.setState({ text: '' });
	}

	render() {
		return (

			<div>
				<form onSubmit={this.onSubmitMessage.bind(this)}>

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
	return { currentChannel: state.currentChannel, channels:state.channels }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postMessage }, dispatch);
}

export default connect(mapStateToProps, actions)(MessageBar);
