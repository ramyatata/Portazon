const express = require('express');
const path = require('path');
const server = express();
const routes = require('./search/index.js');
let elasticsearch = require('elasticsearch');


// Middleware
server.use(express.static(path.join(__dirname, '../client')));

// Routing
server.use('/search', routes);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is awaiting request');
});