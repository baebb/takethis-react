import {AUTH_USER, SIGN_OUT_USER, AUTH_MESSAGE, AUTH_LOADING} from '../actions/types';

const init_state = {
  authenticated: false,
  authMessage: null,
  authMessageType: null,
  user: {},
  authLoading: false
}

export default function (state = init_state, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, authMessage: null, authMessageType: null, authLoading: false, user: action.payload};
    case AUTH_MESSAGE:
      return {...state, authenticated: false, authMessage: action.payload.message, authLoading: false};
    case SIGN_OUT_USER:
      return {...state, authenticated: false, authMessage: null, user: {}};
    case AUTH_LOADING:
      return {...state, authLoading: true};
    default:
      return state;
  }
}