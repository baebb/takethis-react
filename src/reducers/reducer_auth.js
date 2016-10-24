import {AUTH_USER, SIGN_OUT_USER, AUTH_ERROR, ATTEMPT_AUTH} from '../actions/types';

const init_state = {
  authenticated: false,
  error: null,
  user: {},
  attempt_auth: false
}

export default function (state = init_state, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, error: null, attempt_auth: false, user: action.payload};
    case AUTH_ERROR:
      return {...state, authenticated: false, error: action.payload.message, attempt_auth: false};
    case SIGN_OUT_USER:
      return {...state, authenticated: false, error: null, user: {}};
    case ATTEMPT_AUTH:
      return {...state, attempt_auth: true};
    default:
      return state;
  }
}