var express = require('express');
var router = express.Router();
var axios = require('axios');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const stripeKeys = require('./../../config/stripe/keys.js');
var stripe = require('stripe')(stripeKeys.testSecretKey);

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
    console.log("Came to POST");
    var stripeToken = req.body.stripeToken.id;
    var paymentAmount = Number(req.body.paymentAmount);
    console.log("PaymentAmount received from Client", paymentAmount, typeof(paymentAmount));
    console.log("Received Stripe token from Client: ", stripeToken);

    stripe.charges.create({
        amount: paymentAmount,
        currency: 'usd',
        description: 'Test Charge',
        source: stripeToken
    }, function (err, charge) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
        else {
            console.log(charge);
            res.sendStatus(200);
        }

    })


})


module.exports = router;