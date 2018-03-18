import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchMessageList } from '../actions';
import { bindActionCreators } from "redux"


class SingleMessage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchMessageList();
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
		return this.props.messageList.map((message, index) => {
			let newMessage = (
				<div>
					<img src={message.imageURL} alt={message.username}></img>
					{message.username}
					{message.text}
					{this.convertTime(message.timestamp)}
				</div>
			)
			return newMessage
		});
	};
};

function mapStateToProps( state ) {
	return { messageList:state.messageList }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessageList:fetchMessageList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMessage);