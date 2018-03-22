import axios from 'axios';
import { MESSAGES, CHANNEL_LIST, CURRENT_USER, USERS } from "../DUMMY_DATA.js"
import { SOCKET_MESSAGE, ADD_USER_TO_CHANNEL, FETCH_CHANNELS, FETCH_CURRENT_CHANNEL_MESSAGES, FETCH_CURRENT_USER, FETCH_USER_LIST, SET_CURRENT_CHANNEL, POST_MESSAGE, FETCH_DIRECT_MESSAGES, FETCH_MESSAGE_LIST } from './types';


export const fetchChannels = (lastActive) => async dispatch => {
  const res = await axios.get('/api/user/channels?type=channel');
  res.data.map( async channel => {
    channel.unread = 0;
    const messages = await axios.get(`/api/channels/${channel.cID}`);
    messages.data.map( message => {
      if (message.timestamp > lastActive) {
        channel.unread += 1
      }
    })
  })

  dispatch({ type: FETCH_CHANNELS, payload: res.data });
};

export const fetchDirectMessages = (lastActive) => async dispatch => {
  const res = await axios.get('api/user/channels?type=dm');
  res.data.map(async channel => {
    channel.unread = 0;
    const messages = await axios.get(`/api/channels/${channel.cID}`);
    messages.data.map(message => {
      if (message.timestamp > lastActive) {
        channel.unread += 1
      }
    })
  })
  dispatch({ type: FETCH_DIRECT_MESSAGES, payload: res.data }); 
};

export const fetchMessageList = () => async dispatch => {
  let res = MESSAGES
  // const res = await axios.get(`/api/channel/:channelId`);

  dispatch({ type: FETCH_MESSAGE_LIST, payload: res }); // change to res.data when api ready
};

export const fetchCurrentChannelMessages = (channelId) => async dispatch => {
  const res = await axios.get(`/api/channels/${channelId}`);

  dispatch({ type: FETCH_CURRENT_CHANNEL_MESSAGES, payload: res.data });
};

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current-user');
  console.log('current user ', res.data)
  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const fetchUserList = () => async dispatch => {
  const res = await axios.get('/api/users');
  // let res = []
  // for (let i = 0; i<USERS.length; i++) {
  //     res.push(USERS[i])
  // }

  dispatch({ type: FETCH_USER_LIST, payload: res.data }); // change to res.data when api ready
};

export const postMessage = (messageText, channelId) => async dispatch => {
  const res = await axios.post(`/api/channels/${channelId}`, messageText)

  dispatch({ type: POST_MESSAGE, payload: res.data })
};

export const setCurrentChannel = (channel, callback) => dispatch => {
  dispatch({  type: SET_CURRENT_CHANNEL, payload: channel }, callback())
  return channel.cID
};

export const createNewChannel = (newChannelData) => async dispatch => {
  const res = await axios.post(`/api/channels`, newChannelData)
  console.log(res.data)
  dispatch({ type: SET_CURRENT_CHANNEL, payload: res.data})
  return res.data.cID
}

export const socketMessage = (inboundMessage) => dispatch => {
  console.log(inboundMessage);
  dispatch({type: SOCKET_MESSAGE, payload: inboundMessage})

}
export const addUserToChannel = (channelId,users) => async dispatch => {
  const res = await axios.post(`/api/user/channels/add`, {users:users, channel:channelId})
  dispatch({  type: ADD_USER_TO_CHANNEL, payload: res.data })
};

export const setNotification = (channels, channelType) => dispatch => {
  console.log("set notification", channels)
  const actionType = channelType === 'channel' ? FETCH_CHANNELS : FETCH_DIRECT_MESSAGES;
  console.log('actionType', actionType)
  dispatch({ type: actionType, payload: channels })
};
