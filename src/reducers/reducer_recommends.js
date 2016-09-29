import {ADD_RECOMMEND, GET_RECOMMENDS, RECEIVE_NEW_RECOMMEND_RESPONSE, AWAIT_NEW_RECOMMEND_RESPONSE} from '../actions/types';

const init_state = {
  hasReceivedData: false,
  submittingNew: false,
  states: {}, // this will store per recommend id if we're reading, editing or awaiting DB response
  data: {} // this will contain firebase data
}

export default function (state = init_state, action) {
  switch (action.type) {
    case AWAIT_NEW_RECOMMEND_RESPONSE:
      return {...state, submittingNew: true};
    case RECEIVE_NEW_RECOMMEND_RESPONSE:
      return {...state, submittingNew: false};
    // case ADD_RECOMMEND:
    //   return [...state, action.payload];
    case GET_RECOMMENDS:
      // return Object.assign({},state,{
      //   hasReceivedData: true,
      //   data: action.payload
      // });
      return {...state, hasReceivedData: true, data: action.payload};
    default:
      return state;
  }
}