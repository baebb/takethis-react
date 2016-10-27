import {AUTH_USER, SIGN_OUT_USER, AUTH_ERROR, AUTH_LOADING} from '../actions/types';

const init_state = {
  authenticated: false,
  error: null,
  user: {},
  auth_loading: false
}

export default function (state = init_state, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, error: null, auth_loading: false, user: action.payload};
    case AUTH_ERROR:
      return {...state, authenticated: false, error: action.payload.message, auth_loading: false};
    case SIGN_OUT_USER:
      return {...state, authenticated: false, error: null, user: {}};
    case AUTH_LOADING:
      return {...state, auth_loading: true};
    default:
      return state;
  }
}