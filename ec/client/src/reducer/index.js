import users from "./users";
import list from "./list";
import items from "./items";
import itemDetail from "./itemDetail";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  users,
  list,
  items,
  itemDetail
});

export default appReducer;
