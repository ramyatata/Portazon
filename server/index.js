const express = require('express');
const path = require('path');
const server = express();
const routes = require('./controller.js');


server.listen(process.env.PORT || 3000, () => {
  console.log('Server is awaiting request');
});

// MIDDLEWARE
server.use(express.static(path.join(__dirname, '../client')));

// ROUTING
server.use('/search', routes);
