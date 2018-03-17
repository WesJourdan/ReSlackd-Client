import { FETCH_MESSAGE_LIST } from '../actions/types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_MESSAGE_LIST:
			return action.payload;
		default:
			return state;
	}
}