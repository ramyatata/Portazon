# Portazon
Portents + Amazon!

> An amazon clone e-commerce website built with micro services in the backend.

## Team

  - __Product Owner__: Li
  - __Scrum Master__: Manjunath
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

### Querying the ES Endpoints:

Search Query && Categories: /search?q=[QUERY]&category=[SELECTEDCATEGORY]

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
