import { combineReducers } from 'redux';
import ChannelsReducer from "./channels_reducer";
import MessagesReducer from './messages_reducer';

export default combineReducers({
    channels: ChannelsReducer
    messages: MessagesReducer
});