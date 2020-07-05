
const initialState = {
  level: "",
  redirectUrl: "",
  message: ""
}


export default function notification(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return Object.assign({}, state, {
        message: action.message,
        level: action.level,
        redirectUrl: action.redirectUrl
      });
    case 'REST_NOTIFICATION':
      return Object.assign({}, state, {
        message: "",
        level: "",
        redirectUrl: ""
      });

    default:
      console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}