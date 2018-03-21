import React, { Component } from "react";
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { postMessage, setCurrentChannel, fetchChannels } from '../actions';
import TextareaAutosize from 'react-autosize-textarea';

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
    // this.props.setCurrentChannel(this.props.channels[0],() => {})
  }


	onInputChange(event) {
		this.setState({ text: event.target.value });

		if (event.target.value !== '') {
		// here is where we would broadcast to the socket that a user is typing a message
		}
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.props.postMessage({text:this.state.text}, this.props.currentChannel.cID)
			this.setState({ text: '' });
		}
	}
	
		
	

	render() {
		return (
			<div className="container force-to-bottom">
				<div className="form-group mx-2" onKeyPress={this.handleKeyPress.bind(this)}>
					<TextareaAutosize
						class="form-control"
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
	return { currentChannel: state.currentChannel, channels:state.channels }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ postMessage }, dispatch);
}

export default connect(mapStateToProps, actions)(MessageBar);
