import React, { Component } from "react";

class MessageBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.onInputChange = this.onInputChange.bind(this)
	}


	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		}
	}

	onSubmitMessage(event) {
		event.preventDefault();
		// send the message to the server and/or socket
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

export default MessageBar
