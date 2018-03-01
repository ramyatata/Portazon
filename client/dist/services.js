'use strict';

var createGuestUser = function() {
  var guestNo = 0;
  var Guest = function() {
    this.cart = [];
    this.guestNumber = guestNo;
    this.firstname = 'Guest';
  };
  var newGuest = new Guest();
  console.log('new guest', newGuest);
  this.setState({guestNum: guestNo, user: newGuest});
}



module.exports = {
  createGuestUser: createGuestUser
}