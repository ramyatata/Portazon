const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./config/passport-config.js');
const model = require('./model');
const encryptor = require('./encryptor');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

// Cookie-Session & Body-Parser middlewares
router.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieSession]
}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//*************
// Cookie Session Check
//*************
router.get('/', (req, res) => {
  res.status(200).send(JSON.stringify(req.session));
});


//*************
// User Login Routing
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
      res.status(201).send(JSON.stringify(req.session));
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
  // TBD
});

// Logoff
router.get('/logout', (req, res) => {
  req.session = null;
  //window.location.replace("http://localhost:3000");
  res.status(200).send('Session has been destroyed');
})


//*************
// Shopping Card Routing
//*************
router.post('/cart', (req, res) => {
  model.getUserCart(req.body, (response) => {
      res.status(201).send(response);
  });
});

router.post('/updateCart', (req, res) => {
  model.updateCart(req.body, (response) => {
    res.status(201).send(response);
  })
});


//*************
// Invoices Routing
//*************
router.post('/invoices', (req, res) => {
  model.getInvoices(req.body, (response) => {
    res.status(201).send(response);
  });
});

router.post('/updateInvoices', (req, res) => {
  model.updateInvoices(req.body, (response) => {
    res.status(201).send(response);
  })
});


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

    model.registerUser(req.body, (response) => {
      res.status(201).send(response);
    });
  })
});

router.post('/deleteUser', (req, res) => {
  model.deleteUser(req.body, (response) => {
    res.status(201).send(response);
  })
});

module.exports = router;