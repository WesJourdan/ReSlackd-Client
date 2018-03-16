import { combineReducers } from 'redux';
import ChannelsReducer from "./channels_reducer";

export default combineReducers({
    channels: ChannelsReducer
});