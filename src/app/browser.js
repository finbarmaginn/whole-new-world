// include polyfills
import 'babel-polyfill'
import './polyfill'

// create react app
// import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import store from './reducers'

import App from './index'
import Home from './containers/Home'

import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}

hydrate(
  <Provider store={store}>
    <App />
  {/*<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute compnent={Home} />
    </Route>
  </Router>*/}
  </Provider>,
  document.getElementById("app")
);
