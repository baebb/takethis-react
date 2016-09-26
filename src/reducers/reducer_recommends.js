import {ADD_RECOMMEND} from '../actions/types';

export default function(state = [],action) {
  switch (action.type) {
    case ADD_RECOMMEND:
      return [...state, action.payload];
    default:
      return state;
  }
}