const request = require('request');
const expect = require('chai').expect;

describe('Search', () => {
  it('should respond to GET requests for "/" with a 200 status code', (done) => {
    request('http://localhost:3000/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return data from a search query', (done) => {
    request('http://localhost:3000/search?q=games', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.be.an('array');
      done();
    });
  });

  it('should return data from a specific category', (done) => {
    request('http://localhost:3000/search/category?category=games', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.be.an('array');
      done();
    });
  });

  it('should return data from a search query with a specific category', (done) => {
    request('http://localhost:3000/search?q=nike&category=shoes', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.be.an('array');
      done();
    })
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/nonexistent', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});


describe('Users', () => {
  it('registers new user', (done) => {
    let requestParams = {
      uri: 'http://localhost:3000/users/registerUser',
      method: 'POST',
      json: {
        "firstname": "James",
        "lastname": "Hetfield",
        "email": "jaymz@met.com",
        "pw": "as",
        "salt": "adf",
        "street": "",
        "num": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      }
    };

    request(requestParams, (error, response, body) => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should LOGIN the user', (done) => {
    let requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/users/login',
      json: {
        "email": "jaymz@met.com",
        "pw": "as"
      }
    };

    request(requestParams, (error, response, body) => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should DELETE the user', (done) => {
    let requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/users/deleteUser',
      json: {
        "email": "jaymz@met.com",
      }
    };

    request(requestParams, (error, response, body) => {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('it rejects incorrect UN/PW credentials', (done) => {
    let requestParams = {
      method: 'POST',
      uri: 'http://localhost:3000/users/login',
      json: {
        "email": "jaymz@met.com",
        "pw": "666"
      }
    };
    request(requestParams, (error, response, body) => {
      expect(response.statusCode).to.equal(401);
      expect(body).to.equal(false);
      done();
    })
  })
});


/*
  it('should accept POST requests to /classes/messages', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });




  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing a `results` array', function(done) {
    request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /classes/messages', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with messages that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        username: 'Jono',
        message: 'Do my bidding!'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messages = JSON.parse(body).results;
        expect(messages[0].username).to.equal('Jono');
        expect(messages[0].message).to.equal('Do my bidding!');
        done();
      });
    });
  });
});

*/