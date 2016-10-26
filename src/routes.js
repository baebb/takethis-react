import React from 'react';
import {Route, Router, IndexRoute} from 'react-router';

import App from './containers/app';
import Home from './containers/home';
import Recommend from './containers/recommend';
import Login from './containers/login';

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="recommend" component={Recommend}/>
      <Route path="login" component={Login} />
    </Route>
  </Router>
)