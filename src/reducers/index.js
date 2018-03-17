import { combineReducers } from 'redux';
import channelsReducer from "./channels_reducer";
import messagesReducer from './messages_reducer';
import authReducer from './auth_reducer';
import messageListReducer from './message_list_reducer';
import currentChannelReducer from './current_channel_reducer';

export default combineReducers({
    auth: authReducer,
    channels: channelsReducer,
    messageList: messageListReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer
});