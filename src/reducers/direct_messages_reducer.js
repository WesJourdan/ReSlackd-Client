import { FETCH_DIRECT_MESSAGES } from '../actions/types';

export default function (state = [], action) {
	// We will need one case here where the socket is receiving messages.
	// In that case we will need to append the new message to the existing messages in the store.
	switch (action.type) {
		case FETCH_DIRECT_MESSAGES:
			return action.payload;
		default:
			return state;
	}
}
