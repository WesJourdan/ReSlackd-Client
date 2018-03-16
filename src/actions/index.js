import axios from 'axios';
import { FETCH_CHANNELS, FETCH_MESSAGES } from './types';

export const fetchChannels = () => async dispatch => {
  const res = await axios.get('/api/channels');
  
  dispatch({ type: FETCH_CHANNELS, payload: res.data });
};