import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  StaticRouter as Router,
  Route
 } from 'react-router-dom';
import { renderToString } from 'react-dom/server'
import template from './template'
import store from './app/reducers'
import App from './app'
import Home from './app/containers/Home'
import Gallery from './app/containers/Gallery'
import About from './app/containers/About'
import Header from './app/components/Header'
import Footer from './app/components/Footer'
import sassExtract from 'sass-extract'

const PORT = (process.env.PORT || ""),
  server = express(),
  sass = require('node-sass'),
  result = sass.renderSync({
    file: './src/app/scss/style.scss'
  });


server.use('/dist', express.static('dist'));
server.use('/favicon.ico', express.static('dist/assets/favicon.ico'));
server.use('/splat-144.png', express.static('dist/assets/splat-144.png'));
server.use('/splat-512.png', express.static('dist/assets/splat-512.png'));
server.use('/manifest.json', express.static('dist/assets/manifest.json'));
server.use('/sw.js', express.static('dist/sw.js'));
// sort out manifest

server.get('*', (req, res) => {
  const appString = renderToString(
    <Provider store={store}>
      <App>
        <Router location={req.url} context={{}}>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Footer />
          </div>
        </Router>
      </App>
    </Provider>
  );
  res.send(template({
    body: appString,
    title: 'Finbar\'s Isomorphic React App',
    store: JSON.stringify(store.getState()),
    style: result.css.toString()
  }));
});
server.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
});
