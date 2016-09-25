import {GET_PRODUCTS, SELECT_PRODUCT} from '../../src/actions/types';

const INIT_STATE = {results: [], selected: null}

export default function (state = INIT_STATE, action) {
  // console.log('reducer hit:')
  // console.log(action.type);
  // console.log(action.payload);
  switch (action.type) {
    case GET_PRODUCTS:
      return {selected: null, results: action.payload.data};
    case SELECT_PRODUCT:
      return {results: [], selected: action.payload};
    default:
      return state;
  }
}