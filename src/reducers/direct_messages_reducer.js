import { FETCH_DIRECT_MESSAGES } from '../actions/types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_DIRECT_MESSAGES:
		console.log(action.payload)
			return action.payload;
		default:
			return state;
	}
}
