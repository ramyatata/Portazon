import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';

var axios = require('axios');

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      street: '',
      aptNo: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      password: '',
      country: 'USA',

      formErrors: {
        firstname: '',
        lastname: '',
        street: '',
        aptNo: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        password: ''
      },

      firstnameValid: false,
      lastnameValid: false,
      streetValid: false,
      aptNoValid: false,
      cityValid: false,
      stateValid: false,
      zipValid: false,
      countryValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    };

    this.validateField = this.validateField.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.errorClass = this.errorClass.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  registerUser() {
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      street: this.state.street,
      aptNo: this.state.aptNo,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      pw: this.state.password,
      country: this.state.country
    }
    this.props.registerUser(user);
  }

  errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
  }

  validateForm(){
    this.setState({formValid: this.state.emailValid && this.state.firstnameValid})
  }

  changeView(){
    this.props.changeView('homePage');
  }

  validateField(fieldName, value){
    let fieldValidationErrors = this.state.formErrors;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;
    let streetValid = this.state.streetValid;
    let aptNoValid = this.state.aptNoValid;
    let cityValid = this.state.cityValid;
    let stateValid = this.state.stateValid;
    let zipValid = this.state.zipValid;
    let countryValid = this.state.countryValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'firstname':
        firstnameValid = value.match(/[a-zA-Z]+/) && value.length > 0;
        fieldValidationErrors.firstname = firstnameValid? '' : 'no numeric values';
        break;
      case 'lastname':
        lastnameValid = value.match(/[a-zA-Z]+/) && value.length > 0;
        fieldValidationErrors.lastname = lastnameValid? '' : 'no numeric values';
        break;
      case 'street':
        streetValid = value.match(/\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/) && value.length > 0;
        fieldValidationErrors.street = streetValid ? '' : ' is invalid';
        break;
      case 'aptNo':
        aptNoValid = value.match(/(\d)+/);
        fieldValidationErrors.aptNo = aptNoValid? '' : 'apt no not valid , only numbers';
        break;
      case 'city':
        cityValid = value.match(/(?:[A-Z][a-z.-]+[ ]?)+/) && value.length > 0;
        fieldValidationErrors.city = cityValid? '' : 'not valid city';
        break;
      case 'zip':
        zipValid = value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        fieldValidationErrors.zip = zipValid ? '' : 'zip is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length > 6;
        fieldValidationErrors.password = passwordValid? '' : 'password not valid min 6 chars';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      firstnameValid: firstnameValid,
      lastnameValid: lastnameValid,
    }, this.validateForm)

  }

  handleUserInput(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, ()=>{this.validateField(name, value)});
  }


  render() {
    return (
    <form className="col-xs-12">
      <div className="col-xs-6 col-xs-offset-4 signup-title"><h2>Create Your Account</h2></div>
      <div className="col-xs-6 col-xs-offset-3" style={styles.form}>

      <div style={{paddingTop: '20px'}}>
        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.firstname)}`}>
          <label className="control-label col-xs-2">First Name</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-user"></i></span>
              <input name="firstname" placeholder="First Name" className="form-control" type="text" value={this.state.firstname} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.lastname)}`}>
          <label className="col-md-2 control-label" >Last Name</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-user"></i></span>
              <input name="lastname" placeholder="Last Name" className="form-control" type="text"
              value={this.state.lastname} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.street)}`}>
          <label className="col-md-2 control-label">Street</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-home"></i></span>
              <input name="street" placeholder="Street" className="form-control" type="text"
              value={this.state.street} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.aptNo)}`}>
          <label className="col-md-2 control-label">Apt No</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-home"></i></span>
              <input name="aptNo" placeholder="Apt No" className="form-control" type="text"
              value={this.state.aptNo} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.city)}`}>
          <label className="col-md-2 control-label">City</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-home"></i></span>
              <input name="city" placeholder="city" className="form-control"  type="text"
              value={this.state.city} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.state)}`}>
          <label className="col-md-2 control-label">State</label>
          <div className="col-md-10 selectContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-list"></i></span>
              <select name="state" className="form-control selectpicker"
                value={this.state.state} onChange={(event) => this.handleUserInput(event)}>
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

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.zip)}`}>
          <label className="col-md-2 control-label">Zip Code</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-home"></i></span>
              <input name="zip" placeholder="Zip Code" className="form-control" type="text"
              value={this.state.zip} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label">Country</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-home"></i></span>
              <input name="country" placeholder="Country" className="form-control" type="text"
              value={this.state.country} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="col-md-2 control-label">Email</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-envelope"></i></span>
              <input name="email" name="email" placeholder="E-Mail Address" className="form-control" type="text" value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className={`form-group col-xs-12
            ${this.errorClass(this.state.formErrors.password)}`}>
          <label className="col-md-2 control-label">Password</label>
          <div className="col-md-10 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"  style={styles.icon}><i className="glyphicon glyphicon-pencil"></i></span>
              <input name="password" type="password" placeholder="Password" className="form-control"
              value={this.state.password} onChange={(event) => this.handleUserInput(event)}/>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <label className="col-md-2 control-label"></label>
          <div className="col-md-10">
            <div className="col-xs-6">
              <button type="button" id="sign-up-button" className="btn-md register-button" onClick={this.registerUser} disabled={!this.state.formValid}>SIGN UP</button>
            </div>
            <div className="col-xs-6">
              <button type="button" className="btn-md register-button" onClick={()=> this.changeView()}>HOME</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
 }
}

const styles = {
  icon: {'backgroundColor': '#2BABBC'},
  form: {
    'border': 'solid 1px lightgrey',
    'backgroundColor': '#ededed',
    'borderRadius': '8px'
  }
}

// const RegisterUserForm = ({registerUser}) => {

//   const validate = () => {
//     let user = {
//       firstname: document.getElementById('firstName').value,
//       lastname: document.getElementById('lastName').value,
//       street: document.getElementById('street').value,
//       aptNo: document.getElementById('aptNo').value,
//       city: document.getElementById('city').value,
//       state: document.getElementById('state').value,
//       zip: document.getElementById('zip').value,
//       email: document.getElementById('reg-email').value,
//       pw: document.getElementById('reg-pwd').value,
//       country: document.getElementById('country').value
//     };
//     if (user.country === '') {
//       user.country = 'USA';
//     }
//     let required = ['firstName', 'lastName', 'email', 'pwd'];
//     for (let i = 0; i < required.length; i++) {
//       if (user[required[i]] === '') {
//         alert('First Name, Last Name, Email, and password are required!');
//         return;
//       }
//     }
//     registerUser(user);
//   }

//   return (
//     <div>
//       <form className="register-user-form">
//         <div className="col-sm-12">
//           <h3>Registration Form</h3>
//         </div>
//         <div className="row">
//           <div className="col-sm-6">
//             <label htmlFor="firstName">First Name</label>
//             <input className="form-control" id="firstName" placeholder="First Name"/>
//           </div>
//           <div className="col-sm-6">
//             <label htmlFor="lastName">Last Name</label>
//             <input className="form-control" id="lastName" placeholder="Last Name"/>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-sm-8">
//             <label htmlFor="street">Street</label>
//             <input className="form-control" id="street" placeholder="street"/>
//           </div>
//           <div className="col-sm-4">
//             <label htmlFor="aptNo">Apt. No</label>
//             <input className="form-control" id="aptNo" placeholder="No."/>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-sm-4">
//             <label htmlFor="city">City</label>
//             <input className="form-control" id="city" placeholder="City"/>
//           </div>
//           <div className="col-sm-2">
//             <label htmlFor="state">State</label>
//             <input className="form-control" id="state" placeholder="State"/>
//           </div>
//           <div className="col-sm-3">
//             <label htmlFor="zip">Postal Code</label>
//             <input className="form-control" id="zip" placeholder="Postal Code"/>
//           </div>
//           <div className="col-sm-3">
//             <label htmlFor="country">Country (if NOT the US)</label>
//             <input className="form-control" id="country" placeholder="Country"/>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-sm-6">
//             <label htmlFor="email">Email</label>
//             <input className="form-control" id="reg-email" placeholder="Email"/>
//           </div>
//           <div className="col-sm-6">
//             <label htmlFor="pwd">Password</label>
//             <input className="form-control" id="reg-pwd" placeholder="Password"/>
//           </div>
//         </div>
//         <button onClick={validate} type="button" id="sign-up-button" className="btn btn-primary">Sign Up!
//         </button>
//         <button className="btn btn-info">
//           <Link to='/'>Back to Home</Link>
//         </button>
//       </form>
//     </div>
//   )
// }



export default RegisterUserForm;


