import React, { Component } from 'react';
import { fetchChannels, setCurrentChannel, fetchDirectMessages, fetchCurrentChannelMessages, fetchCurrentChannelUsers, setNotification, fetchCurrentUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Modal from './Modal';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      activeIndex: null,
      update: true,
    };
  
    this.handleClick = this.handleClick.bind(this);
    
  }

  componentDidMount() {    
    this.props.fetchCurrentUser()

    if (this.props.messageType === "channel") {
      this.props.fetchChannels()
    } else {
      this.props.fetchDirectMessages()
    }

    socket.on('receive message', (inboundMessage) => {
      const channels = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
      channels.map( channel => {
        if (channel.cID == inboundMessage.cID && channel.cID !== this.props.currentChannel.cID) {
          channel.unread += 1
          this.props.setNotification(channels, this.props.messageType)
          this.setState({ update: !this.state.update })
        }
      })
    })
    this.setState({ update: !this.state.update })
  }

  componentWillReceiveProps(nextProps) {
    // map through the list of channels and create a room for each one.
    if (this.props.messageType === "channel") {
      if (this.props.channels !== nextProps.channels) {
        nextProps.channels.map( channel => {
          if (channel.cID !== this.props.currentChannel.cID) {
            socket.emit('room', { room: channel.cID });
            console.log('joining room: ', channel.cID)
          }
        })
      }
    } else {
      if (this.props.directMessages !== nextProps.directMessages) {
        nextProps.directMessages.map(channel => {
          if (channel.cID !== this.props.currentChannel.cID) {
            socket.emit('room', { room: channel.cID });
            console.log('joining room: ', channel.cID)
          }
        })
      }
    } 
    this.setState({ update: !this.state.update })
  }

  handleClick(event) {

    const channelId = event.target.getAttribute('channel-id')
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    const currentChannel = channelArray.find((channel) => {
      return channel.cID == channelId
    })
 
    if (currentChannel) {
      currentChannel.unread = 0;
      this.props.setCurrentChannel(currentChannel, (cID) => {
        this.props.fetchCurrentChannelMessages(currentChannel.cID)
        this.props.fetchCurrentChannelUsers(currentChannel.cID)
        this.setState({ activeIndex: parseInt(channelId, 10) })
        
      })
    }
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
              <div className={activeChannel} channel-id={channel.cID} key={channel.cID} onClick={this.handleClick}>
                {channel.name}<span className="badge ml-1 badge-pill badge-danger">{channel.unread > 0 ? channel.unread : null}</span> 
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
  return { channels: state.channels, directMessages: state.directMessages, currentChannel: state.currentChannel, usersInChannel: state.channelUsers, auth: state.auth }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentChannelUsers, fetchDirectMessages, fetchChannels, setCurrentChannel, fetchCurrentChannelMessages, setNotification, fetchCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
