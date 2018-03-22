import React, { Component } from 'react';
import { fetchChannels, setCurrentChannel, fetchDirectMessages, fetchCurrentChannelMessages, setNotification } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Modal from './Modal';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');



class Channels extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.messageType === "channel") {
      this.props.fetchChannels()
    } else {
      this.props.fetchDirectMessages()
    }
    
    socket.on('receive message', (inboundMessage) => {
      const channels = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
      channels.map( channel => {
        if (channel.cID == inboundMessage.cID) {
          channel.unread += 1
          console.log(channel)
          setNotification(channels, this.props.messageType)
        }
      })
      

      //dispatch an action here to update the channels/DMs notifications in the store
      console.log('Notification!', inboundMessage);
    })
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
   
  }
 
  handleClick(event) {
    const channelId = event.target.getAttribute('channel-id')
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    const currentChannel = channelArray.find( (channel) => {
      return channel.cID == channelId
    })
    this.props.setCurrentChannel(currentChannel, (cID) => {
      this.props.fetchCurrentChannelMessages(currentChannel.cID)
    })
  }

  render() {
    const channelType = this.props.messageType === "channel" ? "Channels" : "Direct Messages"
    const channelArray = this.props.messageType === "channel" ? this.props.channels : this.props.directMessages
    return (
      <div className="mb-3 channels">
        <p>
          {channelType}
          <span className="add-channel-icon float-right ml-2" role="button"><Modal messageType={this.props.messageType}/></span>
        </p>
        <div className='pl-2'>
          {channelArray.map(channel => {
            return (
              <div className="channel-item" channel-id={channel.cID} key ={channel.cID} onClick={this.handleClick}>
                {channel.name}
                {channel.unread > 0 ? channel.unread : ''}
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
  return { channels: state.channels, directMessages: state.directMessages, currentChannel: state.currentChannel }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDirectMessages, fetchChannels, setCurrentChannel, fetchCurrentChannelMessages, setNotification }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
