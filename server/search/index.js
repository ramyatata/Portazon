const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');

// BodyParser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});


//*************
// ElasticSearch
// (i.e. need JDK installed to run)
//*************

const client = new elasticsearch.Client({
  host: process.env.PORT || 'http://localhost:9200',
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

// Create Index
let initIndex = () => {
  return client.indices.create({
    index: 'carsindex'
  });
}

// Check if 'Index' exists
let indexExist = (name) => {
  return client.indices.exists({
    index: 'carsindex'
  });
}

// Create Mapping
let initMapping = () => {
  return client.indices.putMapping({
    index: 'carsindex',
    type: 'cars',
    body: {
      properties: {
        title: { type: 'text' },
        brand: { type: 'text' },
        description: { type: 'string' },
        price: { type: 'float'}
      }
    }
  });
}

// Add Document (ie. equivalent to a 'row' in RDMS)
let addDocument = (doc) => {
  return client.index({
    index: 'carsindex',
    type: 'cars',
    body: {
      properties: {
        title: '328',
        brand: 'bmw',
        description: 'tremendous car, believe me',
        price: 50000
      }
    }
  });
}

// Search query suggestions
let searchResults = (input) => {
  console.log('this is the input inside searchResults', input)
  return client.search({
    index: 'carsindex',
    type: 'cars',
  });
}


//*************
// Search API
//*************

router.get('/', (req, res) => {
  searchResults(req.query.q).then((result) => {
    res.status(200).send('Here are some search results!', result);
  })
});

router.post('/', (req, res) => {
  addDocument(req.body).then((result) => {
    res.status(201).send(result);
  })
});

module.exports = router;