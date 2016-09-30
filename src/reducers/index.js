import { combineReducers } from 'redux';
import SearchProductsReducer from './reducer_search_products';
import CategoryReducer from './reducer_categories';
import RecommendReducer from './reducer_recommends';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  searchProducts: SearchProductsReducer,
  categories: CategoryReducer,
  recommends: RecommendReducer,
  auth: AuthReducer
});

export default rootReducer;
