import {
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
} from "../../constants/ActionTypes";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START});
    localStorage.clear();
    dispatch({ type: FETCH_SUCCESS });
    dispatch({ type: SIGNOUT_USER_SUCCESS, initURL:'/' });
  }
};
