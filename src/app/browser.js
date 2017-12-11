import React from 'react'
import {render} from 'react-dom'
import App from './index'
import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}

render(<App username="Finbar" />, document.getElementById("app"));
// TODO: redux
// TODO: reducers & actions etc
// TODO: Server and client side rendering
