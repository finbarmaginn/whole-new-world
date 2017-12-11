import 'babel-polyfill'
import './polyfill'

import React from 'react'
import {hydrate} from 'react-dom'
import App from './index'
import Promise from 'promise-polyfill'
import {Provider} from 'react-redux'
import store from './reducers'
if (!window.Promise) {
  window.Promise = Promise
}

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
