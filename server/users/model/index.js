const mysql = require('mysql');
const config = require('../config');
const db = mysql.createConnection(config);
db.connect();

module.exports = {
  doesUserExist: (profile, cb) => {
    let { firstname, lastname, email } = profile;

    db.query(`SELECT * FROM users WHERE users.email = '${email}'`, (err, data) => {
      if (err) throw 'User email is not in the DB';
      cb(data[0] || false);
    });
  },


  getInvoices: (details, cb) => {
    let { firstname, lastname, userID } = details;

    db.query(`
      SELECT invoices FROM user_invoices
      INNER JOIN users
      WHERE users.id = user_invoices.userID
      AND users.firstname = '${firstname}'
      AND users.lastname = '${lastname}'
      AND users.id = ${userID}`,
      (err, data) => {
        if (err) throw 'Error in the GET cart query';
        cb(data);
      }
    );
  },

  updateInvoices: (details, cb) => {
    let { userID, productID, price, productName, image_url, amount, email } = details;

    db.query(`
      SELECT invoices FROM user_invoices
      INNER JOIN users
      WHERE users.id = user_invoices.userID
      AND users.email = '${email}'
      AND users.id = ${userID}`,
      (err, data) => {
        if (err) throw 'Error in the pull Invoice query';

        let invoices = JSON.parse(data[0].invoices);

        let exists = false;
        for (let i = 0; i < invoices.length; i++) {
          if (invoices[i].productID === productID) {
            invoices[i].amount = amount;
            exists = true;
          }
        }

        if (!exists) {
          let item = {
            productID: productID,
            price: price,
            image: [image_url],
            amount: amount,
            productName: productName
          };
          invoices.push(item);
        }


        invoices = JSON.stringify(invoices);

        db.query(`UPDATE user_invoices SET invoices = '${invoices}' WHERE userID = '${userID}'`, (err, data) => {
          if (err) throw 'Could not update product in Invoices'
          cb(`Product Id ${productID} has been modified in ${email}'s Invoices`);
        });
      }
    );
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

  updateCart: (details, cb) => {
    let { userID, productID, price, productName, image_url, amount, email, deleteItem } = details;

    db.query(`
      SELECT cart FROM shopping_cart
      INNER JOIN users
      WHERE users.id = shopping_cart.userID
      AND users.email = '${email}'
      AND users.id = ${userID}`,
      (err, data) => {
        if (err) throw 'Error in the pull cart query';

        let cart = JSON.parse(data[0].cart);
        console.log('this is the cart', cart)
        console.log('deleteItem', deleteItem)

        if (deleteItem) {
          //delete cart[productID]
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID === productID) {
              delete cart[i];
              cart.splice(i, 1);
            }
          }
        } else {
          let exists = false;
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID === productID) {
              cart[i].amount = amount;
              exists = true;
            }
          }
          if (!exists) {
            let item = {
              productID: productID,
              price: price,
              image: [image_url],
              amount: amount,
              productName: productName
            };
            cart.push(item);
          }
        }

        cart = JSON.stringify(cart);

        db.query(`UPDATE shopping_cart SET cart = '${cart}' WHERE userID = '${userID}'`, (err, data) => {
          if (err) throw 'Could not update product in Shopping Cart'
          cb(`Product Id ${productID} has been modified in ${email}'s Shopping Cart`);
        });
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

      db.query(`INSERT INTO shopping_cart (cart, userID) VALUES ('[]', ${data.insertId})`, (err, data) => {
          if (err) throw 'Cart Table creation Error';

          db.query(`INSERT INTO user_invoices (invoices, userID) VALUES ('[]', ${data.insertId})`, (err, data) => {
            if (err) throw 'Invoice Table creation Error';

            cb(`${details.firstname} ${details.lastname} user and cart have been created`);
          });
      });
    });
  },


  deleteUser: (details, cb) => {
    db.query(`SELECT * FROM users WHERE users.email = '${details.email}'`, (err, data) => {
      if (err) throw 'User email is not in the DB';
      let userId = data[0].id;

      if (userId) {
        db.query(`DELETE FROM users WHERE id = ${userId}`, (err, data) => {
          if (err) throw err;
          cb(`${details.email} has been deleted`);
        });
      } else {
        cb('User does not exist to be deleted');
      }
    });
  }
};

