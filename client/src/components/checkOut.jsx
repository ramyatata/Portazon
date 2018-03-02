import React from 'react';
import ReactDom from 'react-dom';
import { Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleUserInput(e){
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({[name]: value});
  // }

  handleChange(field, e) {
    this.setState({[field]: e.target.value})
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
        shippingAddress: address
      }
      this.props.submitInvoice(info);
    }
      this.props.changeView('homePage');
  }

  generateShippingForm() {
    return (
      <div>
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
      </div>
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
              <Panel.Heading>
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
  panel: {
    'textAlign': 'left'
  }
}

export default CheckOut;


{/*
      <div>
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
      </div>

*/}


{/*
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
*/}


{/*
  render() {
    return (
      <div>
        <form className="col-xs-12">
          <div className="col-xs-6 col-xs-offset-5 signup-title"><h3>Shipping Details</h3></div>
          <div className="col-xs-12" style={{border: 'solid 1px lightgrey'}}>

          <div style={{paddingTop: '20px'}}>
            <div className={`form-group col-xs-6`}>
              <label className="control-label col-xs-2">First Name</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input name="firstname" placeholder="First Name" className="form-control" type="text" value={this.state.firstname} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label" >Last Name</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input name="lastname" placeholder="Last Name" className="form-control" type="text"
                  value={this.state.lastname} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">Street</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="street" placeholder="Street" className="form-control" type="text"
                  value={this.state.street} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">Apt No</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="aptNo" placeholder="Apt No" className="form-control" type="text"
                  value={this.state.aptNo} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">City</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="city" placeholder="City" className="form-control"  type="text"
                  value={this.state.city} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">State</label>
              <div className="col-md-10 selectContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
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

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">Zip Code</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="zip" placeholder="Zip Code" className="form-control" type="text"
                  value={this.state.zip} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className="form-group col-xs-6">
              <label className="col-md-2 control-label">Country</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="country" placeholder="Country" className="form-control" type="text"
                  value={this.state.country} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className={`form-group col-xs-6`}>
              <label className="col-md-2 control-label">Email</label>
              <div className="col-md-10 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                  <input name="email" name="email" placeholder="E-Mail Address" className="form-control" type="text" value={this.state.email} onChange={(event) => this.handleUserInput(event)}/>
                </div>
              </div>
            </div>

            <div className="form-group col-xs-6">
              <label className="col-md-2 control-label"></label>
              <div className="col-md-10">
                  <button type="button" className="btn btn-block btn-cart" onClick={this.handleSubmit()} disabled={!this.state.formValid}>SUBMIT INFO</button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    )
  }
}
*/}