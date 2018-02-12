const mysql = require('mysql');
const config = require('../config');
const db = mysql.createConnection(config);
db.connect();

let user = false;
let cart = {};

module.exports = {
  doesUserExist: (profile, cb) => {
    let { firstname, lastname, email } = profile;

    db.query(`SELECT * FROM users WHERE users.email = '${email}'`, (err, data) => {
      if (err) throw 'User email is not in the DB';
      cb(data[0] || false);
    });
  },

  getUserCart: (details, cb) => {
    let { firstname, lastname, userID } = details;

    db.query(`
      SELECT cart FROM shopping_cart
      INNER JOIN users
      WHERE users.id = shopping_cart.userID
      AND users.firstname = '${firstname}'
      AND users.lastname = '${lastname}'
      AND users.id = ${userID}`,
      (err, data) => {
        if (err) throw 'Error in the GET cart query';
        cb(data);
      }
    );
  },

  registerUser: (details, cb) => {
    const columns = `(
      firstname,
      lastname,
      pw,
      salt,
      email,
      street,
      num,
      city,
      state,
      zip,
      country
    )`;
    const values = `(
      '${details.firstname}',
      '${details.lastname}',
      '${details.pw}',
      '${details.salt}',
      '${details.email}',
      '${details.street}',
      '${details.num}',
      '${details.city}',
      '${details.state}',
      '${details.zip}',
      '${details.country}'
    )`;

    db.query(`INSERT INTO users ${columns} VALUES ${values}`, (err, data) => {
      if (err) throw 'User registration Error';
      cb({
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        id: data.insertId
      });
    });

    db.query(`
      INSERT INTO shopping_cart (cart, userID)
      VALUES ('{}', (SELECT COUNT(ID) FROM users))`,
      (err, data) => {
        if (err) throw 'Cart creation Error';
        cb(`${details.firstname} ${details.lastname} cart has been created`);
      });
  },

  updateCart: (details, cb) => {
    let { userID, productID, amount, email, deleteItem } = details;

    db.query(`
      SELECT cart FROM shopping_cart
      INNER JOIN users
      WHERE users.id = shopping_cart.userID
      AND users.email = '${email}'
      AND users.id = ${userID}`,
      (err, data) => {
        if (err) throw 'Error in the GET cart query';

        let cart = JSON.parse(data[0].cart);

        if (deleteItem) {
          delete cart[productID]
        } else {
          cart[productID] = amount;
        }

        cart = JSON.stringify(cart);

        db.query(`UPDATE shopping_cart SET cart = '${cart}' WHERE userID = '${userID}'`, (err, data) => {
          if (err) throw 'Could not update product in Shopping Cart'
          cb(`Product Id ${productID} has been modified in ${email}'s Shopping Cart`);
        });
      }
    );
  }
};

