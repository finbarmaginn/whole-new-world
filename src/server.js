import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import App from './App'
import template from './template'

const PORT = process.env.PORT || 8080,
  server = express(),
  initialState = {
    username: "Finbar"
  }

server.use('/dist', express.static('dist'));
server.get('/', (req, res) => {
  const appString = renderToString(<App {...initialState}/>);
  res.send(template({
    body: appString,
    title: 'Foo Bar',
    initialState: JSON.stringify(initialState)
  }));
});

server.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
});
