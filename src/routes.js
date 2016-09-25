import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import Recommend from './components/recommend';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="recommend" component={Recommend} />
    </Route>
)