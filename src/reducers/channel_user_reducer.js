import { FETCH_CURRENT_CHANNEL_USERS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENT_CHANNEL_USERS:
    if (action.payload) {
      return action.payload;
    }
    else {
      return state
    }
    default:
      return state;
  }
}
