let express = require('express');
let db = require('./database/index.js');
let router = express.Router();
let bodyParser = require('body-parser');

// BODYPARSER
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).send('Routing is working!');
})

module.exports = router;