import {combineReducers} from "redux";
import Auth from "./Auth";
import Seller from "./sellers";
import Notification from "./notification";

export default (history) => combineReducers({
  notify: Notification,
  auth: Auth,
  seller: Seller
});