import {GET_PRODUCTS, SELECT_PRODUCT} from './types';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

export function getProducts(props) {
  const keyword = props.keyword;
  const category = props.category;

  const request = axios({
    method: 'POST',
    url: `${SERVER_URL}/products`,
    data: {
      "keyword": keyword,
      "category": category
    }
  })

  return {
    type: GET_PRODUCTS,
    payload: request
  }
}

export function selectProduct(props) {
  // console.log('action hit');
  // console.log(props);
  return {
    type: SELECT_PRODUCT,
    payload: props
  }
}
