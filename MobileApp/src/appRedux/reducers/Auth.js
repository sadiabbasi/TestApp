const INIT_STATE = {
  token: '', 
  initURL: '',
  authUser: '',
  error: false,
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'signIn_SUCCESS': {
      let {data, token} = action.payload.data
      return {
        ...state,
        token: token,
        authUser: data,
        initURL: 'Dashboard',
        error: false,
      }
    }
    case 'signIn_FAILURE': {
      return {
        ...state,
        error: true,
        message: "Username/password not match",
      }
    }
    case 'signUp_SUCCESS': {
      let {data, token} = action.payload.data
      return {
        ...state,
        token: token,
        authUser: data,
        error: false,
        initURL: 'Dashboard'
      }
    }
    case 'signUp_FAILURE': {
      return {
        ...state,
        error: true,
        message: action.payload,
      }
    }
  
    default:
      return state;
  }
}
