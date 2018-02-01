const express = require('express');
const path = require('path');
const server = express();
const search_route = require('./search/index.js');
const users_route = require('./users/index.js');
//const payment_route = require('./payment/index.js');


// Middleware
server.use(express.static(path.join(__dirname, '../client/dist')));


// Routing
server.use('/users', users_route);
server.use('/search', search_route);
//server.use('/payment', payment_route);

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is awaiting request');
});
