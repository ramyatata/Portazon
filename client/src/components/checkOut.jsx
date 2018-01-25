import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import StoreCheckout from './StoreCheckout.jsx';

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
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleStreetChange = this.handleStreetChange.bind(this);
    this.handleAptNoChange = this.handleAptNoChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleFNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleStreetChange(e) {
    this.setState({street: e.target.value});
  }

  handleAptNoChange(e) {
    this.setState({aptNo: e.target.value});
  }

  handleCityChange(e) {
    this.setState({city: e.target.value});
  }

  handleStateChange(e) {
    this.setState({state: e.target.value})
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
              <input type="text" id="firstName" onChange={e => {this.handleFNameChange(e)}}/>
            <label htmlFor="lastName">Last Name</label>
             <input type="text" id="lastName" onChange={e => {this.handleLNameChange(e)}}/>
          </div>
          <div>
            <label htmlFor="street">Street </label>
              <input type="text" id="street" onChange={e => {this.handleStreetChange(e)}}/>
            <label htmlFor="aptNo">Apt. No. </label>
              <input type="text" id="aptNo" onChange={e => {this.handleAptNoChange(e)}}/>
          </div>
          <div>
            <label htmlFor="city">City </label>
              <input type="text" id="city" onChange={e => {this.handleCityChange(e)}}/>
            <label htmlFor="state">State</label>
              <input type="text" id="state" onChange={e => {this.handleStateChange(e)}}/>
            <label htmlFor="zip">Zip Code </label>
              <input type="text" id="zip" onChange={e => {this.handleZipChange(e)}}/>
          </div>
        </div>
        <div className="checkout-payment col-sm-5">
          Payment Information:
          <StripeProvider apiKey='pk_test_EqbZWzt1btvcfcMIjAQ5s7ze'>
                <StoreCheckout/>
            </StripeProvider>
        </div>
      </div>
    )
  }
}

export default checkOut