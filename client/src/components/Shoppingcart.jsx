import React from 'react';
import { Table } from 'react-bootstrap';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: '',
      totalAmt: 0,
      totalItems: 0
    }
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentWillMount(){
    this.getTotals();
  }



  handleCheckoutClick() {
    console.log('in checkout click')
    this.props.changeView('checkOut');
  }

  handleRemoveClick(item) {
    console.log('item to remove', item)
    this.props.removeItemFromCart(item);
  }

  changeQuantity(e, item) {
    item.amount = Number(e.target.value);
    this.props.changeQuantity(item);
    this.getTotals();
  }

  getTotals(){
    console.log('items', this.props.cart)
    let items = this.props.cart;
    let totalPrice = 0;
    let totalItems = 0;
    for (let i = 0; i < items.length; i++) {
      let price = items[i].price;
      let quantity = items[i].amount;
      let itemTotal = price * quantity;
      items[i].indTotal = itemTotal;
      totalPrice += itemTotal;
      totalItems += quantity;
    }
    this.setState({totalAmt: totalPrice.toFixed(2), totalItems: totalItems, cart: items});
  }

  createItemList() {
    let items = this.props.cart;
    return items.map((item, ind) => (
      <tr key={ind}>
        <td><img src={item.image[0]} alt="" className="cart-item-img" ></img>
        </td>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td><input onChange={e => this.changeQuantity(e, item)} placeholder={item.amount}/>
        </td>
        <td>{item.indTotal}</td>
        <td><button type="button" className="btn btn-danger" onClick={() => this.handleRemoveClick(item)}>Remove</button></td>
      </tr>
    ))

  }

  render() {
    var body;
    let cart = this.state.cart;
    if (cart.length === 0) {
      body = <div>There are no items in your cart.</div>
    } else {
      body =
      <div>
        <div>
          <h3>Your current total amount is: $ {this.state.totalAmt}</h3>
        </div>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.createItemList()}
          </tbody>
        </Table>
        <div className="cart-summary col-sm-12">
          <div className="col-sm-5">
          </div>
          <div className="col-sm-7">
            <Table>
             <tbody>
              <tr>
                <td>Subtotal ({this.state.totalItems} items): </td>
                <td>${this.state.totalAmt}</td>
              </tr>
              <tr>
                <td>Shipping & Handling:</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Estimated Taxes:</td>
                <td>$0.00</td>
              </tr>
              <tr>
                <td>Order Total:</td>
                <td>${this.state.totalAmt}</td>
              </tr>
             </tbody>
            </Table>
            <button onClick={this.handleCheckoutClick}>Checkout</button>
          </div>
        </div>
      </div>
    }
    return(
      <div className="shopping-cart container-fluid">
        <div>
          <h2>shopping cart</h2>
        </div>
        {body}
      </div>
    )
  }
}

export default ShoppingCart;

/*
       <div className="cart-item-banner col-sm-12">
          <h3 className="col-sm-3"></h3>
          <h3 className="col-sm-3">name</h3>
          <h3 className="col-sm-2">price</h3>
          <h3 className="col-sm-2">quantity</h3>
          <h3 className="col-sm-1">total</h3>
        </div>



      <div className="cart-item-list col-sm-12" key={ind}>
        <img src={item.image[0]} alt="" className="cart-item-img col-sm-3"></img>
        <div className="col-sm-3">{item.productName}</div>
        <div className="col-sm-2">{item.price}</div>
        <input onChange={e => this.changeQuantity(e, item)} className="col-sm-1" placeholder={item.amount}/>
        <div className="col-sm-2">{item.indTotal}</div>
        <button type="button" onClick={() => this.handleRemoveClick(item)}>Remove</button>
      </div>
*/

/*
<div>
              <input placeholder="enter promo code here"/>
              <button>Apply</button>
            </div>
            <div className="cart-summary-row">
              <h4> Subtotal ({this.state.totalItems} items):</h4>
              <span> ${this.state.totalAmt}</span>
            </div>
            <div className="cart-summary-row">
              <h4>Shipping & Handling:</h4>
              <span>$0.00</span>
            </div>
            <div className="cart-summary-row">
              <h4>Estimated Taxes:</h4>
              <span>$0.00 **</span>
            </div>
            <div className="cart-summary-row">
              <h4>Estimated Order Total:</h4>
              <span>${this.state.totalAmt}</span>
            </div>
            <div>
              <h4>** Actual sales tax will be calculated at time of shipment</h4>
            </div>
*/



