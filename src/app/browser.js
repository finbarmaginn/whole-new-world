// import polyfills
import 'babel-polyfill'
import './polyfill'
import Promise from 'promise-polyfill'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// create react app
import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import store from './reducers'
import App from './index'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './containers/Home'
import Gallery from './containers/Gallery'
import About from './containers/About'

if (!window.Promise) {
  window.Promise = Promise
}

hydrate(
  <Provider store={store}>
    <App>
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    </App>
  </Provider>,
  document.getElementById("app")
);
