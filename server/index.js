const express = require('express');
const path = require('path');
const server = express();
const search_route = require('./search/index.js');
const users_route = require('./users/index.js');
const passport = require('passport');
const history = require('connect-history-api-fallback');

// Middleware
server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(passport.initialize());

// Routing
server.use('/users', users_route);
server.use('/search', search_route);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is awaiting request');
});
