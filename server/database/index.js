const mongoose = require('mongooose');
const mlabCredentials = require('./config.js');
const db = mongooose.connect({mlabCredentials}, { useMongoClient: true } );

let productSchema = {
  title: String,
  brand: String,
  description: String,
  rating: String,
  price: Number,
  shipping: String
}