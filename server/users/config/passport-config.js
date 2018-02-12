const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const model = require('../model');

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.client_id,
    clientSecret: keys.google.client_secret,
    callbackURL: keys.google.redirect_uris[0]
  }, (accessToken, refreshToken, profile, done) => {

    model.doesUserExist({email: profile.emails[0].value}, (response) => {
      if (response) {
        done(null, response);
        return 'User already exists';
      }

      let userDetails = {
        "firstname": profile.name.givenName,
        "lastname": profile.name.familyName,
        "email": profile.emails[0].value,
        "pw": "",
        "salt": "",
        "street": "",
        "num": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      }

      model.registerUser(userDetails, (response) => {
        console.log('A Google user has been registered...', response);
        done(null, response);
      });
    })
  })
);

module.exports = passport