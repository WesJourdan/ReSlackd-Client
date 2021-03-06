import { combineReducers } from 'redux';
import channelsReducer from "./channels_reducer";
import directMessagesReducer from './direct_messages_reducer';
import authReducer from './auth_reducer';
import messageListReducer from './message_list_reducer';
import currentChannelReducer from './current_channel_reducer';
import userListReducer from './user_list_reducer';
import channelUsersReducer from './channel_user_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    channels: channelsReducer,
    messageList: messageListReducer,
    directMessages: directMessagesReducer,
    currentChannel: currentChannelReducer,
    userList: userListReducer,
    channelUsers: channelUsersReducer
});

export default rootReducer
