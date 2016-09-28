import {ADD_RECOMMEND, GET_RECOMMENDS} from '../actions/types';

export default function(state = [],action) {
  switch (action.type) {
    case ADD_RECOMMEND:
      return [...state, action.payload];
    case GET_RECOMMENDS:
      return [action.payload.data]
    default:
      return state;
  }
}