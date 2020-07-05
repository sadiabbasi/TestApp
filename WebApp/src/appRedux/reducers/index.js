import {combineReducers} from "redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import {connectRouter} from 'connected-react-router'
import notification from './notification';
import Availability from "./Availability";
import Appointments from "./Appointments"

export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  commonData: Common,
  notify: notification,
  Availability,
  Appointments
});