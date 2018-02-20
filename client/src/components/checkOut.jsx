import React from 'react';
import ReactDom from 'react-dom';

// class checkOut extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: '',
//       totalAmt: '',
//       firstName: '',
//       lastName: '',
//       street: '',
//       aptNo:'',
//       city: '',
//       state: '',
//       zip: '',
//       bStreet: '',
//       bAptNo: '',
//       bCity: '',
//       bState: '',
//       bZip:''
//     }
//     this.handleChange = this.handleChange.bind(this);
//   }

  // handleChange(field, e) {
  //   this.setState({field: e.target.value});
  // }

  // handleZipChange(e){
  //   let zip = e.target.value;
  //   if (typeof zip !== 'number') {
  //     alert('zip code must be a valid number');
  //     return;
  //   }
  //   this.setState({zip: e.target.value})
  // }

  // render() {
  const CheckOut = () => {
    const validate = () => {
      let info = {
        firstname: document.getElementById('ship-firstName').value,
        lastname: document.getElementById('ship-lastName').value,
        street: document.getElementById('ship-street').value,
        aptNo: document.getElementById('ship-aptNo').value,
        city: document.getElementById('ship-city').value,
        state: document.getElementById('ship-state').value,
        zip: document.getElementById('ship-zip').value
      }
      let required = Object.keys(info);
      for (let i = 0; i < required.length; i++) {
        if (info[required] === '') {
          alert('All fields must be populated!');
          return;
        }
      }
      //lead to payment once form is validated
    }
    return(
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
    )
  }



export default CheckOut;
