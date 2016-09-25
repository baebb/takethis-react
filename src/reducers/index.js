import { combineReducers } from 'redux';
import SearchProductsReducer from './reducer_search_products';

const rootReducer = combineReducers({
  searchProducts: SearchProductsReducer
});

export default rootReducer;
