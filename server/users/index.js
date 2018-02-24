const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./config/passport-config.js');
const model = require('./model');
const encryptor = require('./encryptor');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const jwt = require('jsonwebtoken');


// Cookie-Session & Body-Parser middlewares
router.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieSession]
}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// API Auth Validation
const JWTvalidation = (header, res) => {
  let token = header;

  if (!token) {
    res ? res.status(401).send({ auth: false, message: 'No token provided.' }) : null;
    return false;
  }

  jwt.verify(token, keys.API_key, function(err, decoded) {
    if (err) {
      res ? res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) : null;
      return false;
    }
  });
  return true;
}

/*++++++++++++++++++
      ROUTING:
++++++++++++++++++*/

//*************
// User Login
//*************

// Manual Login
router.post('/login', (req, res) => {
  model.doesUserExist(req.body, (response) => {
    if (!response) {
      res.status(401).send(response);
      return;
    }

    let hashPW = encryptor.hashPW(req.body.pw, response.salt);
    let user = (hashPW === response.pw) ? response : false;

    if (hashPW === response.pw) {
      req.session = {
        firstname: user.firstname,
        street: user.street,
        city: user.city,
        state: user.state,
        zip: user.zip,
        aptNo: user.num,
        lastname: user.lastname,
        email: user.email,
        id: user.id
      };

      // If user does not have a valid JWT, generate a new one
      let token = req.headers['x-access-token'];
      let isRequestValid = JWTvalidation(token);

      if (!isRequestValid) {
        token = jwt.sign(
          { id: user.id },
          keys.API_key,
          { expiresIn: 86400 } // expires in 24 hours
        );
      };
      console.log('this is toke inside of /login', token)
      res.status(201).send({ auth: true, token, user });
    } else {
      res.status(401).send(false);
    }
  });
})

// Google Login (OAuth)
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.status(200).send(JSON.stringify(req.session.passport.user));
});

// Facebook Login (OAuth)
router.get('/facebook', (req, res) => {
  res.status(200).send('Not available yet');
});

// Logoff
router.get('/logout', (req, res) => {
  req.session = null;
  res.status(200).send('Session has been destroyed');
})


//*************
// Registering Users
//*************
router.post('/registerUser', (req, res) => {
  model.doesUserExist(req.body, (response) => {
    if (response) {
      res.send('User already exists');
      return;
    }

    // Generate a SALT to encrypt the PW
    req.body.salt = encryptor.generateSalt;

    // Hash the PW before storing in the db
    req.body.pw = encryptor.hashPW(req.body.pw, req.body.salt);

    model.registerUser(req.body, (response, userID) => {
      let token = jwt.sign(
        { id: userID },
        keys.API_key,
        { expiresIn: 86400 } // expires in 24 hours
      );

      res.status(201).send({ registered: true, token, user: req.body });
    });
  })
});

router.post('/deleteUser', (req, res) => {
  let isRequestValid = JWTvalidation(req.headers['x-access-token'], res);
  if (!isRequestValid) return;

  model.deleteUser(req.body, (response) => {
    res.status(201).send(response);
  })
});


//*************
// Shopping Card Routing
//*************
router.get('/cart', (req, res) => {
  console.log('THIS IS THE X-ACCESS-TOKEN FROM THE CLIENT', req.headers['x-access-token'])
  let isRequestValid = JWTvalidation(req.headers['x-access-token'], res);
  if (!isRequestValid) return;

  model.getUserCart(req.query, (response) => {
      res.status(201).send(response);
  });
});

router.post('/updateCart', (req, res) => {
  let isRequestValid = JWTvalidation(req.headers['x-access-token'], res);
  if (!isRequestValid) return;

  model.updateCart(req.body, (response) => {
    res.status(201).send(response);
  })
});


//*************
// Invoices Routing
//*************
router.get('/invoices', (req, res) => {
  let isRequestValid = JWTvalidation(req.headers['x-access-token'], res);
  if (!isRequestValid) return;

  model.getInvoices(req.query, (response) => {
    res.status(201).send(response);
  });
});

router.post('/updateInvoices', (req, res) => {
  let isRequestValid = JWTvalidation(req.headers['x-access-token'], res);
  if (!isRequestValid) return;

  model.updateInvoices(req.body, (response) => {
    res.status(201).send(response);
  })
});

module.exports = router;