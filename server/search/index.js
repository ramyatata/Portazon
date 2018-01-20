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
let searchQuery = (query) => {
  if (query.category) {
    return client.search({
      index: 'products',
      type: 'inventory',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  "product_category_tree": query.category
                }
              }
            ],
            should: [
              {
                multi_match: {
                  query: query.q
                }
              }
            ]
          }
        }
      }
    })
  }

  return client.search({
    index: 'products',
    type: 'inventory',
    body: {
      query: {
        multi_match: {
          query: query.q || query,
          fields: ["product_name^1", "brand^3", "product_category_tree^2", "description^5"]
        }
      }
    }
  });
}

// Search Category Products
let showCategory = (category) => {
  return client.search({
    index: 'products',
    type: 'inventory',
    body: {
      query: {
        match: {"product_category_tree": category}
        }
      }
  });
}



//*************
// Search API Routing
//*************


// Search Query && Categories Route
router.get('/', (req, res) => {
  searchQuery(req.query).then((response) => {

    let hits = response.hits.hits;
    res.status(200).send(hits);
  })
});


// Show Category Specific Products Route
router.get('/category', (req, res) => {
  showCategory(req.query.category).then((response) => {

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