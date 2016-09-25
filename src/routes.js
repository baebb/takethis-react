import React from 'react';
import {Route, Router, IndexRoute} from 'react-router';

import App from './components/app';
import Home from './components/home';
import Recommend from './components/recommend';

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="recommend" component={Recommend}/>
    </Route>
    <Route path="/login" component={Login}></Route>
  </Router>
)