const elasticsearch = require('elasticsearch');

//*************
// ElasticSearch Search & DB
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

module.exports = {
  createUser: (input) => {
    let doesIndexExist = client.indices.exists({
      index: 'users'
    });

    if (!doesIndexExist) {
      client.indices.create({
        index: 'users',
      }).then((err, response) => {
        if (err) { console.log('client.indices.create failed') };
        console.log('users DB has been created');
       })
    } else {
      console.log('Users DB exists, moving on..');
    }


    return client.index({
      index: 'users',
      type: 'user',
      id: 1,
      body: {
        properties: {
          "firstName": input.firstname,
          "lastName": input.lastname,
          "address": input.address,
          "cart": []
        }
      }
    })
  },


  searchUser: (user) => {
    return client.search({
      index: 'users',
      type: 'user',
      body: {
        query: {
          multi_match: {
            query: user.q || query
          }
        }
      }
    });
  },


  createNewIndex: (indexName) => {
    return client.indices.create({
      index: indexName
    });
  },


  // Create New Index Mapping
  createIndexMapping: (indexInfo) => {
    return client.indices.putMapping({
      index: indexInfo.index,
      type: indexInfo.type,
      body: {
        properties: {
          firstname: { type: 'text' },
          lastname: { type: 'text' },
          address: { type: 'text' },
        }
      }
    });
  },

  // Check if 'Index' exists
  doesIndexExist: (indexName) => {
    return client.indices.exists({
      index: indexName
    });
  },


  // Delete Index
  deleteIndex: (indexName) => {
    return client.indices.delete((indexName) => {
      index: indexName
    });
  },


  // Delete Documents
  deleteDocs: (doc) => {
    return client.delete({
      index: doc.index,
      type: doc.name
    });
  },


  // Count Documents
  countDocs: (doc) => {
    return client.count({
      index: doc.index,
      id: doc.id,
      type: doc.name
    });
  },


  // Add Document (ie. equivalent to a 'row' in RDMS)
  addDocument: (doc) => {
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
  },


  // Search query
  searchQuery: (query) => {
    if (query.category) {
      return client.search({
        index: 'products',
        type: 'inventory',
        body: {
          from: 0,
          size: 50,
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
        from: 0,
        size: 50,
        query: {
          multi_match: {
            query: query.q || query,
            fields: ["product_name^1", "brand^3", "product_category_tree^2", "description^5"]
          }
        }
      }
    });
  },

  // Search Category Products
  showCategory: (category) => {
    return client.search({
      index: 'products',
      type: 'inventory',
      body: {
        from: 0,
        size: 30,
        query: {
          match: {"product_category_tree": category}
        }
      }
    });
  },
}


