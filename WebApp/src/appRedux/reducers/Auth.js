import { INIT_URL, SIGNOUT_USER_SUCCESS, USER_DATA, USER_TOKEN_SET } from "../../constants/ActionTypes";

const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: JSON.parse(localStorage.getItem('user')),
  redirectUser:false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }
    case 'signIn_SUCCESS': {
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('data', JSON.stringify(action.payload.data));
      return {
        ...state,
        token: action.payload.data.token,
        authUser: null,
        initURL: ''
      }
    }
    case 'signUp_SUCCESS': {
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('data', JSON.stringify(action.payload.data));
      return {
        ...state,
        token: action.payload.data.token,
        authUser: null,
        initURL: ''
      }
    }
  
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }

    default:
      return state;
  }
}
