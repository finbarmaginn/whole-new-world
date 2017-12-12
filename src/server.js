import express from 'express'
import React from 'react'
import Router from 'react-router'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import {renderToString} from 'react-dom/server'
import App from './App'
import template from './template'
import store from './app/reducers'

const PORT = (process.env.PORT || 5000),
  server = express();

server.use('/dist', express.static('dist'));
server.get('/', (req, res) => {
  const appString = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  res.send(template({
    body: appString,
    title: 'Foo Bar',
    store: JSON.stringify(store.getState())
  }));
});

server.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
});
