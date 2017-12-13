import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import template from './template'
import store from './app/reducers'
import App from './App'

const PORT = (process.env.PORT || 8080),
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
    title: 'Finbar\'s Isomorphic React App',
    store: JSON.stringify(store.getState())
  }));
});
server.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
});
