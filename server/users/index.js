const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');

//let db = mysql.createConnection(config);

//db.connect();

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

//*************
// GET Routing: Users
//*************

router.get('/:username', (req, res) => {
  res.status(200).send(req.params.username)
});

//*************
// POST Routing: Create Users
//*************

module.exports = router;