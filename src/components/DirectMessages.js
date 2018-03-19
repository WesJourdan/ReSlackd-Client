import React, { Component } from 'react';
import ChannelSettings from './ChannelSettings';
import { connect } from 'react-redux';
import { fetchDirectMessages } from '../actions';
import { bindActionCreators } from "redux"

class DirectMessages extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  /*  this class needs to map the messages array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action
      passing in the channel ID.
  */

  handleClick(event) {
    //  the syntax here is weird. I can't get access to the 'key' property of the div
    let channelId = event.target.getAttribute('key')
    this.props.setCurrentChannel(channelId)
  }


  componentWillMount() {
    this.props.fetchDirectMessages()
  }


  render() {
    return (
      <div>Direct Messages
        <ChannelSettings messageType="directMessage" />
        <div>
          {this.props.directMessages.map(channel => {
            let newChannel = (
              <div key = {channel.channelId} onClick={this.handleClick}>
                {channel.name}
              </div>
            )
            return newChannel
          })
          }
        </div>
      </div>
    );
    }

}

function mapStateToProps(state) {
	return { directMessages:state.directMessages }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDirectMessages:fetchDirectMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages);
