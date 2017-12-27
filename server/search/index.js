const express = require('express');
const db = require('../database/index.js');
const router = express.Router();
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');

// BodyParser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});


// ElasticSearch Client (i.e. need JDK installed to run)
const client = new elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

// Search API
router.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).send('Search Routing is working!');
})

module.exports = router;