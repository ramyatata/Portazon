const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const queries = require('./queries');

const {
  searchQuery,
  showCategory,
  addDocument,
  editReview,
  createUser,
  searchUser,
  createIndexMapping,
  deleteIndex
} = queries;


// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


//*************
// GET Routing: Search
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
  //DELETE THE LINE BELOW:
  console.log('this is the req.query', req.query)
  showCategory(req.query.category).then((response) => {
    let hits = response.hits.hits;

    res.status(200).send(hits);
  })
});

//*************
// GET Routing: Delete Index
//*************
router.get('/delete', (req, res) => {
  deleteIndex('products')
  .then(() => {
    res.status(2004).send('Product index has been deleted');
  })
  .catch((err) => console.error(err));
});


//*************
// POST Routing: Add/Edit Product Review
//*************
router.post('/review', (req, res) => {

  editReview(req.body).then((response) => {
    res.status(201).send(response);
  })
});


//*************
// POST Routing: New Index Creation
//*************
router.post('/createindex', (req, res) => {
  createIndexMapping(req.body)
  .then(() => {
    res.status(201).send(`${req.body} has been created`);
  })
  .catch((err) => console.error(err));
});


module.exports = router;