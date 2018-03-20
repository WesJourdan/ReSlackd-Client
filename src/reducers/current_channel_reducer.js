import { ADD_USER_TO_CHANNEL, SET_CURRENT_CHANNEL } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case SET_CURRENT_CHANNEL:
			return action.payload;
		case ADD_USER_TO_CHANNEL:
			return {
				...state,
				
			}
		default:
			return state;
	}
}