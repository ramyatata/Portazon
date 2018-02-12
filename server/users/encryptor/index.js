const bcrypt = require('bcrypt');
const saltRounds = Math.random();

module.exports = {
  generateSalt: bcrypt.genSaltSync(saltRounds),
  hashPW: (pw, salt) => bcrypt.hashSync(pw, salt)
}