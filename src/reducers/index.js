import { combineReducers } from 'redux';
import SearchProductsReducer from './reducer_search_products';
import CategoryReducer from './reducer_categories';
import RecommendReducer from './reducer_recommends'

const rootReducer = combineReducers({
  searchProducts: SearchProductsReducer,
  categories: CategoryReducer,
  recommends: RecommendReducer
});

export default rootReducer;
