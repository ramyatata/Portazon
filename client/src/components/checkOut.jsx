import React from 'react';
import ReactDom from 'react-dom';

class CheckOut extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    this.props.submitInvoice();
  }

  render() {
    return(
      <div className="container-fluid">
        <form>
          <div className="checkout-shipping col-sm-7">
            Shipping Address:
            <div>
              <label htmlFor="firstName">First Name</label>
                <input type="text" id="ship-firstName" placeholder="First name"/>
              <label htmlFor="lastName">Last Name</label>
               <input type="text" id="ship-lastName" placeholder="Last name"/>
            </div>
            <div>
              <label htmlFor="street">Street </label>
                <input type="text" id="ship-street" placeholder="Street"/>
              <label htmlFor="aptNo">Apt. No. </label>
                <input type="text" id="ship-aptNo" placeholder="Apt.No"/>
            </div>
            <div>
              <label htmlFor="city">City </label>
                <input type="text" id="ship-city" placeholder="City"/>
              <label htmlFor="ship-state">State</label>
                <input type="text" id="ship-state" />
              <label htmlFor="zip">Zip Code </label>
                <input type="text" id="ship-zip"/>
            </div>
          </div>
          <div className="checkout-payment col-sm-5">
          </div>
        </form>
        <button type="button" className="btn btn-success" onClick={() => this.handleSubmit()}>Submit!</button>
      </div>
    )
  }
}


export default CheckOut;
