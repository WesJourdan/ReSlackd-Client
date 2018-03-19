import React, { Component } from 'react';
import ChannelSettings from './ChannelSettings';
import { fetchChannels, setCurrentChannel, fetchDirectMessages } from '../actions';
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
    if (this.props.messageType === "channel") {
      this.props.fetchChannels()
    } else {
      this.props.fetchDirectMessages()
    }
  }

  handleClick(event) {
    console.log(this.props)
    //  the syntax here is weird. I can't get access to the 'key' property of the div
    let channelId = event.target.getAttribute('channel-id')
    this.props.setCurrentChannel(channelId)
  }

  render() {
    const channelType = this.props.messageType === "channel" ? "Channels" : "Direct Messages"
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    return (
      <div>{channelType}
        <ChannelSettings messageType={this.props.messageType}/>
        <div>
          {channelArray.map(channel => {
            return (
              <div channel-id={channel.cID} key = {channel.cID} onClick={this.handleClick}>
                {channel.name}
              </div>
            )
          })
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { channels: state.channels, directMessages: state.directMessages }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDirectMessages, fetchChannels, setCurrentChannel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
