import React from 'react';

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


  }


  render() {
    return (
      <div>
        <div className="col-sm-7">
          Shipping Address:
          <input placeholder="First Name"/>
          <input placeholder="Last Name"/>
          <input placeholder="Street Address"/>
          <input placeholder="Apt. No."/>
          <input placeholder="City" />
          <input placeholder="State"/>
          <input placeholder="Zip Code"/>
        </div>
        <div>
          Payment Information:
        </div>
      </div>
    )
  }
}