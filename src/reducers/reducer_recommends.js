import {ADD_RECOMMEND, GET_RECOMMENDS} from '../actions/types';

const init_state = {
  hasreceiveddata: false,
  submittingnew: false,
  states: {}, // this will store per recommend id if we're reading, editing or awaiting DB response
  data: {} // this will contain firebase data
}

export default function(state = init_state,action) {
  switch (action.type) {
    case ADD_RECOMMEND:
      return [...state, action.payload];
    case GET_RECOMMENDS:
      return Object.assign({},state,{
        hasreceiveddata: true,
        data: action.payload
      });
    default:
      return state;
  }
}