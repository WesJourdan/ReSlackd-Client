import React, { Component } from 'react';
import ChannelSettings from './ChannelSettings';
import * as actions from '../actions';
import { connect } from 'react-redux';
const DUMMY = require('../DUMMY_DATA');


class Channels extends Component {
  constructor(props) {
    super(props);
    // this.handleClick.bind(this);
    console.log(props)
  }
  /*  this class needs to map the channels array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action 
      passing in the channel ID.
  */
  handleClick(event) {
    actions.setCurrentChannel(event.target.getAttribute('channelId'))
  }

  renderChannels () {
    return DUMMY.CHANNEL_LIST.map(channel => {
      if (channel.type == 'channel') {
        let newChannel = (
          <div channelId = {channel.channelId} key = {channel.channelId} onClick={this.handleClick}>
            {channel.name}
          </div>
        )
        return newChannel
      }
    });

  }

    render() {
      return (
        <div>Channels
          <ChannelSettings />
          <div>
          {this.renderChannels()}
          </div>
        </div>
      );
    }

}

export default connect(null, actions)(Channels);
