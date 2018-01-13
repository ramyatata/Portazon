const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


//*************
// ElasticSearch Search & DB
//
// For Kibana, use port '5601' (e.g. localhost:5601 or http://OURDOMAIN.com:5601.)
// (note: need JDK 8 installed to run. Java 9+ is not compatible)
// Download Java 8 here: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
// Logstash Data: https://www.kaggle.com/PromptCloudHQ/all-jc-penny-products/discussion/41733
// DEPLOYMENT: change file-paths from Users/....
// DEPLOYMENT: download elasticsearch, kibana, and logstash to individual folders inside /search/
// DEPLOYMENT: npm run elasticsearch
// DEPLOYMENT: npm run kibana
// DEPLOYMENT: npm run -logstash will add all the FlipKart products to the ElasticSearch db
//*************


// Create a new instance of Elasticsearch Client
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
let createIndex = (indexName) => {
  return client.indices.create({
    index: indexName
  });
}


// Check if 'Index' exists
let doesIndexExist = (indexName) => {
  return client.indices.exists({
    index: indexName
  });
}


// Create New Index Mapping
let createMapping = (indexInfo) => {
  return client.indices.putMapping({
    index: indexInfo.index,
    type: indexInfo.type,
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


// Delete Index
let deleteIndex = (indexName) => {
  return client.indices.delete((indexName) => {
    index: indexName
  });
}


// Delete Documents
let deleteDocs = (doc) => {
  return client.delete({
    index: doc.index,
    type: doc.name
  });
}


// Count Documents
let countDocs = (doc) => {
  return client.count({
    index: doc.index,
    id: doc.id,
    type: doc.name
  });
}


// Add Document (ie. equivalent to a 'row' in RDMS)
let addDocument = (doc) => {
  return client.index({
    index: 'products',
    type: 'inventory',
    body: {
      properties: {
        title: doc.title,
        brand: doc.brand,
        description: doc.description,
        price: doc.price
      }
    }
  });
}


// Search query
let search = (query) => {
  console.log('this is the input inside searchResults', query)
  return client.search({
    index: 'products',
    type: 'inventory',
    body: {
      query: {
        multi_match: {
          query: query,
          fields: ["name_title^4", "brand^3", "category_tree^2", "description"]
          /*
          "message" : {
                "query" : "to be or not to be",
                "operator" : "and",
                "zero_terms_query": "all"
        }*/
        }
      }
    }
  });
}


//*************
// Search API Routing
//*************

router.get('/', (req, res) => {
  search(req.query.q).then((response) => {
    console.log('success!', response.hits.hits)

    let hits = response.hits.hits;
    res.status(200).send(hits);
  })
});


router.post('/', (req, res) => {
  console.log('this is req.body', req.body);

  addDocument(req.body).then((response) => {
    res.status(201).send(response);
  })
});

module.exports = router;