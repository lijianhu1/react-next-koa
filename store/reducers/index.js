import { combineReducers } from "redux";
import count from "./count";
import user from "./user"
const appReducer = combineReducers({
  count,
  user
});
export default appReducer;
