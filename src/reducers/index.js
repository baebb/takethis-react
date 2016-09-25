import { combineReducers } from 'redux';
import SearchProductsReducer from './reducer_search_products';
import CategoryReducer from './reducer_categories';

const rootReducer = combineReducers({
  searchProducts: SearchProductsReducer,
  categories: CategoryReducer
});

export default rootReducer;
