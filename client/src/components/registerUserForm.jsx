import React from 'react';
import ReactDom from 'react-dom';

var axios = require('axios');


const RegisterUserForm = () => {

  const validate = () => {
    let user = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      street: document.getElementById('street').value,
      aptNo: document.getElementById('aptNo').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zip').value,
      email: document.getElementById('email').value,
      pwd: document.getElementById('pwd').value,
    };
    console.log('user to register', user)
    let required = ['firstName', 'lastName', 'email', 'pwd'];
    for (let i = 0; i < required.length; i++) {
      if (user[required[i]] === '') {
        alert('First Name, Last Name, Email, and password are required!');
        return;
      }
    }
    axios.post('/users/registerUser', user)
      .then(res => {
        console.log('submitted user to table!', res)
      })
  }

  return (
      <form className="register-user-form">
        <div className="col-sm-12">
          <h3>Registration Form</h3>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="firstName">First Name</label>
            <input className="form-control" id="firstName" placeholder="First Name"/>
          </div>
          <div className="col-sm-6">
            <label htmlFor="lastName">Last Name</label>
            <input className="form-control" id="lastName" placeholder="Last Name"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <label htmlFor="street">Street</label>
            <input className="form-control" id="street" placeholder="street"/>
          </div>
          <div className="col-sm-4">
            <label htmlFor="aptNo">Apt. No</label>
            <input className="form-control" id="aptNo" placeholder="No."/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="city">City</label>
            <input className="form-control" id="city" placeholder="City"/>
          </div>
          <div className="col-sm-2">
            <label htmlFor="state">State</label>
            <input className="form-control" id="state" placeholder="State"/>
          </div>
          <div className="col-sm-3">
            <label htmlFor="zip">Postal Code</label>
            <input className="form-control" id="zip" placeholder="Postal Code"/>
          </div>
          <div className="col-sm-3">
            <label htmlFor="country">Country (if NOT the US)</label>
            <input className="form-control" id="country" placeholder="Country"/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" placeholder="Email"/>
          </div>
          <div className="col-sm-6">
            <label htmlFor="pwd">Password</label>
            <input className="form-control" id="pwd" placeholder="Password"/>
          </div>
        </div>
        <button onClick={validate} type="submit" id="sign-up-button" className="btn btn-primary">Sign Up!
        </button>
      </form>
    )
}



export default RegisterUserForm;

/*

<div className="registerUserForm container-fluid">
        <h3>Registration Form</h3>
        <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={e => {this.handleChange('firstName', e)}}/>
        <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastfirstName" onChange={e => {this.handleChange('lastName', e)}}/>
        <label htmlFor="email">Email</label>
          <input type="text" id="email" onChange={e => {this.handleChange('email', e)}}/>
        <label htmlFor="password">Password</label>
          <input type="text" id="pwd" onChange={e => {this.handleChange('pwd', e)}}/>
        <label htmlFor="street">Street</label>
          <input type="text" id="street" onChange={e => {this.handleChange('street', e)}}/>
        <label htmlFor="aptNo">Apt. No.</label>
          <input type="text" id="aptNo" onChange={e => {this.handleChange('aptNo', e)}}/>
        <label htmlFor="city">City</label>
          <input type="text" id="city" onChange={e => {this.handleChange('city', e)}}/>
        <label htmlFor="state">State</label>
          <input type="text" id="state" onChange={e => {this.handleChange('state', e)}}/>
        <label htmlFor="zip">Postal Code</label>
          <input type="text" id="zip" onChange={e => {this.handleChange('zip', e)}}/>
        <label htmlFor="country">Country (if NOT the US)</label>
          <input type="text" id="country" onChange={e => {this.handleChange('country', e)}}/>
        <button type="submit" onClick={this.handleSubmit}>Sign Up!</button>
      </div>


*/
