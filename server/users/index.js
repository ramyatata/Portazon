const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');
const db = mysql.createConnection(config);

db.connect();

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//*************
// GET Routing: Users Login
//*************

// Check User (i.e. manual login)
router.get('/', (req, res) => {
  let { firstname, lastname, email } = req.query;

  db.query(`SELECT * FROM users WHERE users.email = '${email}'`, (err, data) => {
    if (err) throw 'User email is not in the DB';
    res.status(200).send(data);
  })
})


router.get('/google', (req, res) => {
  // handle with Passport
});

router.get('/facebook', (req, res) => {
  // handle with Passport
});

router.get('/logout', (req, res) => {
  // handle with Passport
})


//*************
// GET Routing: User Shopping Card
//*************
router.get('/cart', (req, res) => {
  let { firstname, lastname, userID } = req.query;

  db.query(`SELECT cart FROM shopping_cart INNER JOIN users WHERE users.id = shopping_cart.userID AND users.firstname = '${firstname}' AND users.lastname = '${lastname}' and users.id = ${userID}`, (err, data) => {
    if (err) throw 'Error in the GET cart query';
    res.status(200).send(data);
  });
});


//*************
// POST Routing: Registering Users
//*************
router.post('/registerUser', (req, res) => {
  const columns = `(
    firstname,
    lastname,
    pw,
    email,
    street,
    num,
    city,
    state,
    zip,
    country
  )`;
  const values = `(
    '${req.body.firstname}',
    '${req.body.lastname}',
    '${req.body.pw}',
    '${req.body.email}',
    '${req.body.street}',
    '${req.body.num}',
    '${req.body.city}',
    '${req.body.state}',
    '${req.body.zip}',
    '${req.body.country}'
    )`;

  db.query(`INSERT INTO users ${columns} VALUES ${values}`, (err, data) => {
    if (err) throw 'User registration Error';
    console.log(`${req.body.firstname} ${req.body.lastname} is a new user`);
  });

  db.query(`INSERT INTO shopping_cart (cart) VALUES ('{}')`, (err, data) => {
    if (err) throw 'Cart creation Error';
    res.status(201).send(`${req.body.firstname} ${req.body.lastname} cart has been created`);
  });
});

router.post('/updateCart', (req, res) => {
  let { userID, productID, amount, email, deleteItem } = req.body;

  db.query(`
    SELECT cart FROM shopping_cart
    INNER JOIN users
    WHERE users.id = shopping_cart.userID
    AND users.email = '${email}'
    AND users.id = ${userID}`
    , (err, data) => {
      if (err) throw 'Error in the GET cart query';

      let cart = JSON.parse(data[0].cart);

      if (deleteItem) {
        delete cart[productID]
      } else {
        cart[productID] = amount;
      }

      cart = JSON.stringify(cart);

      db.query(`UPDATE shopping_cart SET cart = '${cart}' WHERE userID = '${userID}'`, (err, data) => {
        if (err) throw 'Could not update product in Shopping Cart';
        res.status(201)
        .send(`Product Id ${productID} has been modified in ${email}'s Shopping Cart`);
      });
  });
});

module.exports = router;