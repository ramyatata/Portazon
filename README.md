# Portazon
Portents + Amazon!

> An amazon clone e-commerce website built with micro services in the backend.

## Team

  - __Product Owner__: Li
  - __Scrum Master__: Manjhunath
  - __Development Team__: Ramya, Vitor

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- mySql

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running MySQL and populating its User Database

To run the user-schema the first time: npm run refresh-schema
For deployment purpuses: update the index.js inside of /users/config

## MySQL Users && Shopping_Cart Tables

To Check a user (End)




### Running ElasticSearch and populating its Database

Install JDK (Java Development Kit) but there is one caveat. DO NOT INSTALL v9, you need to install v8 otherwise Logstash will not work. You can check you JDK version typing 'java -version' in terminal (Mac).

Download ElasticSearch: https://www.elastic.co/downloads/elasticsearch
Download Kibana (optional for now): https://www.elastic.co/downloads/kibana
Download LogStash: https://www.elastic.co/products/logstash

After you download them, add them as separate folders inside the server/search folder(e.g. /server/search/elasticsearch)

Go to package.json and change the file path from my local folder (/Users/vpereira1982/HackReactor/) to yours for Logstash.
Inside the /server/data folder, you will find a file called 'logstash.conf', make sure you do the same there on line 3 (path) so Logstash can find this file
Lastly, make sure there is a product_list.csv file inside of this 'data' folder;

Now just run all these commands to initiate everything:

npm start
npm run elasticsearch
npm run kibana (if you installed it)
npm run logstash

And there you have it! If you make a 'GET' request passing a key value of 'q=value', you should get results back: http://127.0.0.1:3000/search/?q=games

### Stripe Keys

For Payments to work, you will have to sign up on Stripe.com and enter your Test Secret Key and Test Publishable Key inside config/stripe/keys.js file.

### DB Query Endpoints:

  GET REQUESTS:

  1 - Search Query && Categories: /search?q=[QUERY]&category=[SELECTEDCATEGORY]
  2 - Check User: /users?firstname=[FIRSTNAME]&lastname=[LASTNAME]&email=[EMAIL]
  3 - Check Shopping_Cart: /users/cart?firstname=[FIRSTNAME]&lastname=[LASTNAME]&userID=[ID]

  POST REQUEST:

  1 - Register New User: /users/registerUser
    Send a JSON with the following key/values:

      {
        firstname,
        lastname,
        pw,
        email,
        address,
        state,
        zip,
        country
      }

  2 - Update Shopping Cart: /users/updateCart
    Send an JSON with the following key/values:

    {
      userID,
      productID,
      amount,
      email,
      deleteItem (* this should be a boolean)
    }

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
