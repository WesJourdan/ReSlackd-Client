import React, { Component } from 'react';
import { fetchChannels, setCurrentChannel, fetchDirectMessages, fetchCurrentChannelMessages, fetchCurrentChannelUsers } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Modal from './Modal';



class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: null };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.messageType === "channel") {
      this.props.fetchChannels()
    } else {
      this.props.fetchDirectMessages()
    }
  }

  handleClick(event) {
    const channelId = event.target.getAttribute('channel-id')
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    const currentChannel = channelArray.find((channel) => {
      return channel.cID == channelId
    })
    this.props.setCurrentChannel(currentChannel, (cID) => {
      this.props.fetchCurrentChannelMessages(currentChannel.cID)
      this.props.fetchCurrentChannelUsers(currentChannel.cID)
      this.setState({ activeIndex: parseInt(channelId, 10) })
    })
  }

  render() {
    const channelType = this.props.messageType === "channel" ? "Channels" : "Direct Messages"
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    return (
      <div className="mb-3 channels">
        <div>
          {channelType}
          <span className="add-channel-icon float-right ml-2" role="button"><Modal messageType={this.props.messageType}/></span>
        </div>
        <div className='pl-2'>
          {channelArray.map( (channel,index) => {
            const activeChannel = this.state.activeIndex === channel.cID && this.props.currentChannel.type === this.props.messageType ? "channel-item active" : "channel-item"
            return (
              <div className={activeChannel} channel-id={channel.cID} key ={channel.cID} onClick={this.handleClick}>
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
  return { channels: state.channels, directMessages: state.directMessages, currentChannel: state.currentChannel, usersInChannel: state.channelUsers }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentChannelUsers, fetchDirectMessages, fetchChannels, setCurrentChannel, fetchCurrentChannelMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
