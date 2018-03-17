import React, { Component } from 'react';
const DUMMY = require('../DUMMY_DATA');
import * as actions from '../actions';
import { connect } from 'react-redux';

class DirectMessages extends Component {
  
  /*  this class needs to map the messages array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action 
      passing in the channel ID.
  */

  handleClick (channelId) {
    this.props.setCurrentChannel(channelId)
  }

  renderMessages () {
    return DUMMY.CHANNEL_LIST.map(channel => {

      if (channel.type = 'dm') {
        let newChannel = (
          <div key={channel.channelId} onClick={this.handleClick(this.key)}>
            {channel.title}
          </div>
        )
        return newChannel
      }
    });
  }

  render() {
    return (
      <div>Direct Messages
          <ChannelSettings />
        <div>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(DirectMessages);
