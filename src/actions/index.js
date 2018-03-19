import axios from 'axios';
import { MESSAGES, CHANNEL_LIST, CURRENT_USER, USERS } from "../DUMMY_DATA.js"
import { FETCH_CHANNELS, FETCH_CURRENT_CHANNEL_MESSAGES, FETCH_CURRENT_USER, FETCH_USER_LIST, SET_CURRENT_CHANNEL, POST_MESSAGE, FETCH_DIRECT_MESSAGES, FETCH_MESSAGE_LIST } from './types';

export const fetchChannels = () => async dispatch => {
  // const res = await axios.get('/api/user/channels?channel');
  let res = []
  for (let i = 0; i<CHANNEL_LIST.length; i++) {
    if (CHANNEL_LIST[i].type === "channel") {
        res.push(CHANNEL_LIST[i])
    }
  }
  dispatch({ type: FETCH_CHANNELS, payload: res }); // change to res.data when api ready
};

export const fetchDirectMessages = () => async dispatch => {
  // const res = await axios.get('api/user/channels?dm');
  let res = []
  for (let i = 0; i<CHANNEL_LIST.length; i++) {
    if (CHANNEL_LIST[i].type === "dm") {
      res.push(CHANNEL_LIST[i])
    }
  }

  dispatch({ type: FETCH_DIRECT_MESSAGES, payload: res }); // change to res.data when api ready
};

export const fetchMessageList = () => async dispatch => {
  // const res = await axios.get(`/api/channel/:channelId`);
  let res = MESSAGES

  dispatch({ type: FETCH_MESSAGE_LIST, payload: res }); // change to res.data when api ready
};

export const fetchCurrentChannelMessages = (channelId) => async dispatch => {
  const res = await axios.get(`/api/channels/${channelId}`);

  dispatch({ type: FETCH_CURRENT_CHANNEL_MESSAGES, payload: res.data });
};

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const fetchUserList = () => async dispatch => {
  //const res = await axios.get('/api/users');
  let res = []
  for (let i = 0; i<USERS.length; i++) {
      res.push(USERS[i])
  }

  dispatch({ type: FETCH_USER_LIST, payload: res }); // change to res.data when api ready
};

export const postMessage = (messageText, channelId) => async dispatch => {
  const res = await axios.post(`/api/channels/${channelId}`, messageText)

  dispatch({ type: POST_MESSAGE, payload: res.data })
};

export const setCurrentChannel = (channelId, callback) => dispatch => {
  console.log(callback)
  dispatch({  type: SET_CURRENT_CHANNEL, payload: channelId }, callback())
};
