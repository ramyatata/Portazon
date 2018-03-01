import React from 'react';
import ReactDom from 'react-dom';
import { Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
    console.log('in handleSubmit in checkout')
    this.props.submitInvoice();
  }

  generateShippingForm() {
    return (
      <form>
        <FormGroup controllid="formBasicText">
          <div>
            <div className="col-sm-5" style={styles.controlLabel}>
              <ControlLabel>First name</ControlLabel>
              <FormControl type="text" placeholder="First name" onClick={(e) => this.handleChange('firstname', e)}/>
            </div>
            <div className="col-sm-5">
              <ControlLabel >Last name</ControlLabel>
              <FormControl type="text" placeholder="Last name" onClick={(e) => this.handleChange('lastname', e)}/>
            </div>
            <div className="col-sm-2"></div>
          </div>
          <div>
            <div className="col-sm-5">
              <ControlLabel>Street</ControlLabel>
              <FormControl type="text" placeholder="Street" onClick={(e) => this.handleChange('street', e)}/>
            </div>
            <div className="col-sm-2">
              <ControlLabel>Apt. No.</ControlLabel>
              <FormControl type="text" placeholder="Apt.No" onClick={(e) => this.handleChange('aptNo', e)}/>
            </div>
            <div className="col-sm-2">
              <ControlLabel>State</ControlLabel>
              <FormControl type="text" placeholder="Abbrev" onClick={(e) => this.handleChange('state', e)}/>
            </div>
            <div className="col-sm-3">
              <ControlLabel>Postal Code</ControlLabel>
              <FormControl type="text" placeholder="Postal Code" onClick={(e) => this.handleZipChange('zip', e)}/>
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
            <Panel bsStyle="info">
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
    }
  }
}

const styles = {
  controlLabel: {'textAlign': 'left'}
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