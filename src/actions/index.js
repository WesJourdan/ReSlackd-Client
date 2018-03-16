import axios from 'axios';
import { FETCH_CHANNELS, FETCH_CURRENT_CHANNEL, FETCH_CURRENT_USER, FETCH_USER_LIST } from './types';

export const fetchChannels = () => async dispatch => {
  const res = await axios.get('/api/user/channels');

  dispatch({ type: FETCH_CHANNELS, payload: res.data });
};

export const fetchCurrentChannel = (id) => async dispatch => {
  const res = await axios.get(`/api/user/channel/${id}`);

  dispatch({ type: FETCH_CURRENT_CHANNEL, payload: res.data });
};

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserList = () => async dispatch => {
  const res = await axios.get('/api/users');

  dispatch({ type: FETCH_USER_LIST, payload: res.data });
};
