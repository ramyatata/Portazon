import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';

var axios = require('axios');

const RegisterUserForm = ({registerUser}) => {

  const validate = () => {
    let user = {
      firstname: document.getElementById('firstName').value,
      lastname: document.getElementById('lastName').value,
      street: document.getElementById('street').value,
      aptNo: document.getElementById('aptNo').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zip').value,
      email: document.getElementById('reg-email').value,
      pw: document.getElementById('reg-pwd').value,
      country: document.getElementById('country').value
    };
    if (user.country === '') {
      user.country = 'USA';
    }
    let required = ['firstName', 'lastName', 'email', 'pwd'];
    for (let i = 0; i < required.length; i++) {
      if (user[required[i]] === '') {
        alert('First Name, Last Name, Email, and password are required!');
        return;
      }
    }
    registerUser(user);
  }

  return (
    <form class="col-xs-12">
      <div className="col-xs-6 col-xs-offset-5 signup-title"><h3>Create Your Account</h3></div>
      <div className="col-xs-6 col-xs-offset-3" style={{border: 'solid 1px lightgrey'}}>

      <div style={{paddingTop: '20px'}}>
        <div className="form-group col-xs-12">
          <label className="control-label col-xs-2">First Name</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input id="firstName" placeholder="First Name" className="form-control"  type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label" >Last Name</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input id="lastName" placeholder="Last Name" className="form-control"  type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Street</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
              <input id="street" placeholder="Street" className="form-control" type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Apt No</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
              <input id="aptNo" placeholder="Apt No" className="form-control" type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">City</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
              <input id="city" placeholder="city" className="form-control"  type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">State</label>
          <div className="col-md-10 selectContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
              <select id="state" className="form-control selectpicker" >
                <option value=" " >Please select your state</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option >Arizona</option>
                <option >Arkansas</option>
                <option >California</option>
                <option >Colorado</option>
                <option >Connecticut</option>
                <option >Delaware</option>
                <option >District of Columbia</option>
                <option> Florida</option>
                <option >Georgia</option>
                <option >Hawaii</option>
                <option >daho</option>
                <option >Illinois</option>
                <option >Indiana</option>
                <option >Iowa</option>
                <option> Kansas</option>
                <option >Kentucky</option>
                <option >Louisiana</option>
                <option>Maine</option>
                <option >Maryland</option>
                <option> Mass</option>
                <option >Michigan</option>
                <option >Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option> Uttah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Zip Code</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
              <input id="zip" placeholder="Zip Code" className="form-control"  type="text"/>
            </div>
          </div>
        </div>
        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Country</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
              <input id="country" placeholder="Country" className="form-control"  type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Email</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
              <input id="reg-email" placeholder="E-Mail Address" className="form-control" type="text"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Password</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-pencil"></i></span>
              <input id="reg-pwd" type="password" placeholder="Password" className="form-control"/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label"></label>
          <div className="col-md-10">
            <div className="col-xs-6">
              <button type="button" id="sign-up-button" class="btn btn-block btn-default" onClick={validate}>SIGN UP</button>
            </div>
            <div className="col-xs-6">
              <button type="button" class="btn btn-block btn-default" ><Link to='/'>HOME</Link></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );

  // return (
  //   <div>
  //     <form className="register-user-form">
  //       <div className="col-sm-12">
  //         <h3>Registration Form</h3>
  //       </div>
  //       <div className="row">
  //         <div className="col-sm-6">
  //           <label htmlFor="firstName">First Name</label>
  //           <input className="form-control" id="firstName" placeholder="First Name"/>
  //         </div>
  //         <div className="col-sm-6">
  //           <label htmlFor="lastName">Last Name</label>
  //           <input className="form-control" id="lastName" placeholder="Last Name"/>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col-sm-8">
  //           <label htmlFor="street">Street</label>
  //           <input className="form-control" id="street" placeholder="street"/>
  //         </div>
  //         <div className="col-sm-4">
  //           <label htmlFor="aptNo">Apt. No</label>
  //           <input className="form-control" id="aptNo" placeholder="No."/>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col-sm-4">
  //           <label htmlFor="city">City</label>
  //           <input className="form-control" id="city" placeholder="City"/>
  //         </div>
  //         <div className="col-sm-2">
  //           <label htmlFor="state">State</label>
  //           <input className="form-control" id="state" placeholder="State"/>
  //         </div>
  //         <div className="col-sm-3">
  //           <label htmlFor="zip">Postal Code</label>
  //           <input className="form-control" id="zip" placeholder="Postal Code"/>
  //         </div>
  //         <div className="col-sm-3">
  //           <label htmlFor="country">Country (if NOT the US)</label>
  //           <input className="form-control" id="country" placeholder="Country"/>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col-sm-6">
  //           <label htmlFor="email">Email</label>
  //           <input className="form-control" id="reg-email" placeholder="Email"/>
  //         </div>
  //         <div className="col-sm-6">
  //           <label htmlFor="pwd">Password</label>
  //           <input className="form-control" id="reg-pwd" placeholder="Password"/>
  //         </div>
  //       </div>
  //       <button onClick={validate} type="button" id="sign-up-button" className="btn btn-primary">Sign Up!
  //       </button>
  //       <button className="btn btn-info">
  //         <Link to='/'>Back to Home</Link>
  //       </button>
  //     </form>
  //   </div>
  //   )
}



export default RegisterUserForm;


