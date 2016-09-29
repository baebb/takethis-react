import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {Router, browserHistory} from 'react-router';
import Promise from 'redux-promise';
import Thunk from 'redux-thunk';

import Routes from './routes';
import reducers from './reducers';
import * as Actions from './actions/index';



let store = createStore(reducers, compose(
  applyMiddleware(Promise,Thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes}/>
  </Provider>
  , document.querySelector('.container'));

setTimeout(function(){
  store.dispatch( Actions.getRecommends() );
});