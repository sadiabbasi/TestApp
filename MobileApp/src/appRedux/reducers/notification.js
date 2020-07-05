
const initialState = {
  level: "",
  message: ""
}


export default function notification(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return Object.assign({}, state, {
        message: action.message,
        level: action.level,
      });
    case 'REST_NOTIFICATION':
      return Object.assign({}, state, {
        message: "",
        level: "",
      });

    default:
      return state;
  }
}