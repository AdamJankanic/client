import { combineReducers } from "redux";
import messagesReducer from "./Messages.js";
import channelsReducer from "./Channels.js";
import offersReducer from "./Offers.js";
import eventsReducer from "./Events.js";
import userReducer from "./User.js";

const rootReducer = combineReducers({
  allMessages: messagesReducer,
  channelsStore: channelsReducer,
  offersStore: offersReducer,
  eventsStore: eventsReducer,
  userStore: userReducer,
});

export default rootReducer;
