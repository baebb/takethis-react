import {GET_PRODUCTS, SELECT_PRODUCT} from './types';
import axios from 'axios';

const LOCAL_SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'https://takethis-server.herokuapp.com';

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
