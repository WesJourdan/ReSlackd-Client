import { FETCH_MESSAGE_LIST, FETCH_CURRENT_CHANNEL_MESSAGES } from '../actions/types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_MESSAGE_LIST:
			return action.payload;
    case FETCH_CURRENT_CHANNEL_MESSAGES:
      return action.payload;
		default:
			return state;
	}
}
