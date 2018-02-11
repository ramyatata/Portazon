import React from 'react';
//import {StripeProvider} from 'react-stripe-elements';
// import StoreCheckout from './StoreCheckout.jsx';

class checkOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: '',
      totalAmt: '',
      firstName: '',
      lastName: '',
      street: '',
      aptNo:'',
      city: '',
      state: '',
      zip: '',
      bStreet: '',
      bAptNo: '',
      bCity: '',
      bState: '',
      bZip:''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({field: e.target.value});
  }

  handleZipChange(e){
    let zip = e.target.value;
    if (typeof zip !== 'number') {
      alert('zip code must be a valid number');
      return;
    }
    this.setState({zip: e.target.value})
  }

  render() {
    return (
      <div>
        <div className="checkout-shipping col-sm-7">
          Shipping Address:
          <div>
            <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={e => {this.handleChange('firstName',e)}}/>
            <label htmlFor="lastName">Last Name</label>
             <input type="text" id="lastName" onChange={e => {this.handleChange('lastName', e)}}/>
          </div>
          <div>
            <label htmlFor="street">Street </label>
              <input type="text" id="street" onChange={e => {this.handleChange('street', e)}}/>
            <label htmlFor="aptNo">Apt. No. </label>
              <input type="text" id="aptNo" onChange={e => {this.handleChange('aptNo', e)}}/>
          </div>
          <div>
            <label htmlFor="city">City </label>
              <input type="text" id="city" onChange={e => {this.handleChange('city', e)}}/>
            <label htmlFor="state">State</label>
              <input type="text" id="state" onChange={e => {this.handleChange('state', e)}}/>
            <label htmlFor="zip">Zip Code </label>
              <input type="text" id="zip" onChange={e => {this.handleZipChange(e)}}/>
          </div>
        </div>
        <div className="checkout-payment col-sm-5">

          //<StripeProvider apiKey='pk_test_EqbZWzt1btvcfcMIjAQ5s7ze'>
          //      <StoreCheckout/>
           // </StripeProvider>
        </div>
      </div>
    )
  }
}

export default checkOut
