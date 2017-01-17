import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_POLLS,
  FETCH_POLLS_BY_ID,
  FETCH_POLL,
  SEND_VOTE,
  NEW_POLL,
  DELETE_POLL,
  FETCH_IP
} from '../actions/types';

export default function(state = {}, action) {
  
  switch(action.type) {
    case AUTH_USER:
      console.log("action AUTH_USER: ", action.payload);
      return { ...state, error: '', authenticated: true, user: action.payload.user};
    case UNAUTH_USER:
      console.log("action UNAUTH_USER: ",state.user);
      delete state.user;
      return { ...state, authenticated: false};
    case AUTH_ERROR:
      console.log("action AUTH_ERROR: ", action.payload);
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      console.log("action FETCH_MESSAGE: ", action.payload);
      return { ...state, message: action.payload };
    case FETCH_POLLS:
      console.log("action FETCH_POLLS: ", action.payload);
      return { ...state, poll_list: action.payload };
    case FETCH_POLL:
      console.log("action FETCH_POLL: ", action.payload);
      return { ...state, poll: action.payload };
    case SEND_VOTE:
      console.log("action SEND_VOTE: ", action.payload);
      return { ...state, poll: action.payload};
    case NEW_POLL:
      console.log("action NEW_POLL: ", action.payload.data);
      return { ...state};
    case DELETE_POLL:
      console.log("action DELETE_POLL: ", action.payload);
      return { ...state};
    case FETCH_IP:
      console.log("action FETCH_IP: ", action.payload);
      return { ...state, ip: action.payload};
  }

  return state;
}