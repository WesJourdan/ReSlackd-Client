import axios from 'axios';
import { MESSAGES, CHANNEL_LIST, CURRENT_USER, USERS } from "../DUMMY_DATA.js"
import { SOCKET_MESSAGE, ADD_USER_TO_CHANNEL, FETCH_CHANNELS, FETCH_CURRENT_CHANNEL_MESSAGES, FETCH_CURRENT_USER, FETCH_USER_LIST, SET_CURRENT_CHANNEL, POST_MESSAGE, FETCH_DIRECT_MESSAGES, FETCH_MESSAGE_LIST, FETCH_CURRENT_CHANNEL_USERS, REMOVE_SELF_FROM_CHANNEL } from './types';


export const fetchChannels = (lastActive) => async dispatch => {
  const res = await axios.get('/api/user/channels?type=channel');
  // The below block is a way to handle notifications on the front end. 
  // it wil be unecessary if the back end changes the way they are serving this data.
  res.data.map( channel => {
    channel.unread = 0;
  })

  dispatch({ type: FETCH_CHANNELS, payload: res.data });
};

export const fetchDirectMessages = (lastActive) => async dispatch => {
  const res = await axios.get('api/user/channels?type=dm');
  res.data.map(channel => {
    channel.unread = 0;
  })

  dispatch({ type: FETCH_DIRECT_MESSAGES, payload: res.data }); 
};

export const fetchCurrentChannelMessages = (channelId) => async dispatch => {
  const res = await axios.get(`/api/channels/${channelId}?type=messages`);

  dispatch({ type: FETCH_CURRENT_CHANNEL_MESSAGES, payload: res.data.messages });
};

export const fetchCurrentChannelUsers = (channelId) => async dispatch => {
  const res = await axios.get(`/api/channels/${channelId}?type=users`);

  dispatch({ type: FETCH_CURRENT_CHANNEL_USERS, payload: res.data.users });
};

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current-user');
  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const fetchUserList = () => async dispatch => {
  const res = await axios.get('/api/users');

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

export const removeSelfFromChannel = (channelId) => async dispatch => {
  const res = await axios.put(`/api/user/channels`, {channel:channelId})
  dispatch({  type: REMOVE_SELF_FROM_CHANNEL, payload: res.data })
};

