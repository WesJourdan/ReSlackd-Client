import React, { Component } from 'react';
import ChannelSettings from './ChannelSettings';
import { fetchChannels, setCurrentChannel } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"


class Channels extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  /*  this class needs to map the channels array in our store and add the channel ID as a key
      on each result. Then we can add a click handler that dispatches the setCurrentChannel action
      passing in the channel ID.
  */

  componentWillMount() {
    this.props.fetchChannels()
  }

  handleClick(event) {
    console.log(this.props)
  //  the syntax here is weird. I can't get access to the 'key' property of the div
    let channelId = event.target.getAttribute('channel-id')
    this.props.setCurrentChannel(channelId)
  }

  render() {
    return (
      <div>Channels
        <ChannelSettings messageType="channel"/>
        <div>
          {this.props.channels.map(channel => {
            let newChannel = (
              <div channel-id={channel.channelId} key = {channel.channelId} onClick={this.handleClick}>
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
	return { channels:state.channels }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchChannels, setCurrentChannel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
