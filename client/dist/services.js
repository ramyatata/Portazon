'use strict';

var createGuestUser = function() {
  var Guest = function() {
    this.cart = [];
    this.guestNumber = guestNo;
    this.firstname = 'Guest';
  };
  var newGuest = new Guest();
  return newGuest;
};



// module.exports = {
//   createGuestUser: createGuestUser
// };