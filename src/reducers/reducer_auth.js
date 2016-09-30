import {AUTH_USER, SIGN_OUT_USER, AUTH_ERROR} from '../actions/types';

const init_state = {
  authenticated: false,
  error: null
}

export default function (state = init_state, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, error: null};
    case AUTH_ERROR:
      return {...state, authenticated: false, error: action.payload.message};
    case SIGN_OUT_USER:
      return {...state, authenticated: false, error: null};
    default:
      return state;
  }
}