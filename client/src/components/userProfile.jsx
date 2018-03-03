import React from 'react';
import ReactDom from 'react-dom';
import { Tabs, Tab, Panel, Table } from 'react-bootstrap';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.renderPersonalInfo = this.renderPersonalInfo.bind(this);
    this.renderPastInvoices = this.renderPastInvoices.bind(this);
    // this.mapCart = this.mapCart.bind(this);
  }

  componentWillMount() {
    // this.props.getInvoices();
  }



  generateInvoiceBody(invoice) {
    let cart = invoice.cart;
    let mappedItems = cart.map((item, ind) => mapCart(item, ind))
    let date = invoice.date.replace(/T|\:\d\dZ/g,' ');
    console.log('mapped', mappedItems)

    function mapCart(item, ind){
      return (
        <tr key={ind}>
          <td>
          {item.productName}{'       '}<span style={styles.calculate}>(${item.price} x {item.amount} = ${item.price * item.amount})</span>
          </td>
        </tr>
        )
    }

    return(
      <div>
        <div>
          <Table>
            <tbody>
              {mappedItems}
              <tr><td>Total Amount: ${invoice.charged}</td></tr>
              <tr><td>TransactionID: #{invoice.transactionID}</td></tr>
            </tbody>
          </Table>
        </div>

      </div>
    )
  }

  renderPastInvoices() {
    let invoices = this.props.invoices.reverse();
    console.log('invoices in profile', invoices)
    return (
      invoices.map((invoice, ind) => {
        let date = invoice.date.replace(/T|\:\d\dZ/g,' ').substring(0, 10);
        return (
        <div key={ind}>
          <Panel id="collapsible-panel" bsStyle="info" >
            <Panel.Heading>
              <Panel.Title toggle>{date}</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
               {this.generateInvoiceBody(invoice)}
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </div>
      )
      })
    )
  }

  renderPersonalInfo() {
    let user = this.props.user;
    let num = '';
    if (user.aptNo !== 'undefined') {
      num = 'Apt. No.' + user.aptNo;
    }
    return(
      <div>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Name</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{user.firstname} {user.lastname}
          </Panel.Body>
        </Panel>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Email</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{user.email}
          </Panel.Body>
        </Panel>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Address</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p>{user.street} {num}</p>
            <p>{user.city}, {user.state} {user.zip}</p>
          </Panel.Body>
        </Panel>
      </div>
    )
  }

  render() {
    console.log('user in user profile', this.props.user)
    return(
      <div className="user-profile container-fluid">
        <h3>Your Account</h3>
        <Tabs defaultActiveKey={1} id="user-profile-tabs">
          <Tab eventKey={1} title="Personal Info" >
            {this.renderPersonalInfo()}
          </Tab>
          <Tab eventKey={2} title="Orders">
            <h4>Your orders</h4>
            {this.renderPastInvoices()}
          </Tab>
        </Tabs>
      </div>
    )
  }
}


const styles = {
  calculate: {
    'color': '#2BABBC'
  }
}

export default UserProfile