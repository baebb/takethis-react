import {GET_RECOMMENDS, RECEIVE_NEW_RECOMMEND_RESPONSE, AWAIT_NEW_RECOMMEND_RESPONSE} from '../actions/types';

const init_state = {
  hasReceivedData: false,
  submittingNew: false,
  states: {}, // this will store per recommend id if we're reading, editing or awaiting DB response
  data: [] // this will contain firebase data
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
      let newArr = [];
      for (var i in action.payload) {
        action.payload[i].id = i;
        newArr.push(action.payload[i]);
      }
      return {...state, hasReceivedData: true, data: newArr};
    default:
      return state;
  }
}