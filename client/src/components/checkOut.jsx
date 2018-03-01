import React from 'react';
import ReactDom from 'react-dom';
import { Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: '',
      totalAmt: '',
      firstname: '',
      lastname: '',
      street: '',
      aptNo:'',
      city: '',
      state: '',
      zip: '',
      email: '',
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
    this.setState({[field]: e.target.value});
  }

  handleSubmit() {
    if (this.props.user.id) {
      this.props.submitInvoice();
    } else {
      let address = this.state.street + ' ' + this.state.aptNo + ', ' + this.state.city + ', ' + this.state.state + ' ' + this.state.zip;
      let info = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        shippingAddress: address,
        cart: this.props.cart,
        charged: this.props.totalAmt
      }
      console.log('guest invoice to add', info)
    }
  }

  generateShippingForm() {
    return (
      <form>
        <FormGroup controllid="shippingForm">
          <div>
            <div className="col-sm-5" style={styles.controlLabel}>
              <ControlLabel>First name</ControlLabel>
              <FormControl type="text" placeholder="First name" onChange={(e) => this.handleChange('firstname', e)}/>
            </div>
            <div className="col-sm-5">
              <ControlLabel >Last name</ControlLabel>
              <FormControl type="text" placeholder="Last name" onChange={(e) => this.handleChange('lastname', e)}/>
            </div>
          </div>
          <div>
            <div className="col-sm-8">
               <ControlLabel >Email</ControlLabel>
              <FormControl type="text" placeholder="Email" onChange={(e) => this.handleChange('email', e)}/>
            </div>
            <div className="col-sm-4">
            </div>
          </div>
          <div>
            <div className="col-sm-6">
              <ControlLabel>Street</ControlLabel>
              <FormControl type="text" placeholder="Street" onChange={(e) => this.handleChange('street', e)}/>
            </div>
            <div className="col-sm-3">
              <ControlLabel>Apt. No.</ControlLabel>
              <FormControl type="text" placeholder="Apt.No" onChange={(e) => this.handleChange('aptNo', e)}/>
            </div>
          </div>
          <div>
            <div className="col-sm-4">
              <ControlLabel>City</ControlLabel>
              <FormControl type="text" placeholder="City" onChange={(e) => this.handleChange('city', e)}/>
            </div>
            <div className="col-sm-2">
              <ControlLabel>State</ControlLabel>
              <FormControl type="text" placeholder="Abbr." onChange={(e) => this.handleChange('state', e)}/>
            </div>
            <div className="col-sm-3">
              <ControlLabel>Postal Code</ControlLabel>
              <FormControl type="text" placeholder="Postal Code" onChange={(e) => this.handleChange('zip', e)}/>
            </div>
          </div>
        </FormGroup>
      </form>
    )
  }

  render() {
    var aptNo = '';
    if (this.props.user.id) {
      if (this.props.user.num !== 'undefined') {
        aptNo = this.props.user.num;
      }
      return(
        <div className="container-fluid col-sm-12">
          <div>
            <Panel style={styles.panel}>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Shipping Address</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p>{this.props.user.street} {aptNo}</p>
                <p>{this.props.user.city}, {this.props.user.state} {this.props.user.zip}</p>
                <p>{this.props.user.country}</p>
              </Panel.Body>
            <button type="button" className="submit-user-shipping" onClick={() => this.handleSubmit()}>Use this address</button>
            </Panel>
          </div>
          <div>
            <Panel id="collapsible-panel">
              <Panel.Heading>
                <Panel.Title toggle>Use different shipping address</Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  {this.generateShippingForm()}
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col-sm-12">
          <div className="col-sm-1">
          </div>
          <div className="col-sm-10">
            <Panel bsStyle="info">
              <Panel.Heading className="panel-heading">
                <Panel.Title componentClass="h3">Shipping Info</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {this.generateShippingForm()}
              </Panel.Body>
            </Panel>
            <button className="submit-user-shipping" onClick={() => this.handleSubmit()}>Submit Info!
            </button>
          </div>
          <div className="col-sm-1">
          </div>
        </div>

      )
    }
  }
}

const styles = {
  controlLabel: {'textAlign': 'left'},
  panel: {'backgroundColor': '#2BABBC'}
}

export default CheckOut;


/*
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
*/