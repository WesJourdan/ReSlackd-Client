import { combineReducers } from 'redux';
import channelsReducer from "./channels_reducer";
import messagesReducer from './messages_reducer';
import authReducer from './auth_reducer';

export default combineReducers({
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer
});