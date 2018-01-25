import React from 'react';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      totalAmt: 0,
      totalItems: 0
    }
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
  }

  componentDidMount(){
    this.getTotals();
  }

  handleCheckoutClick() {
    console.log('in checkout click')
    this.props.changeView('checkOut');
  }

  changeQuantity(e, item) {
    let cart = this.state.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === item._id) {
        cart[i].quantity = Number(e.target.value);
      }
    }
    this.setState({cart: cart});
    this.getTotals();
  }

  getTotals(){
    let items = this.state.cart;
    let totalPrice = 0;
    let totalItems = 0;
    for (let i = 0; i < items.length; i++) {
      let retail = items[i]._source.retail_price;
      let sale = items[i]._source.discounted_price;
      let quantity = items[i].quantity;
      let itemTotal = 0;
      let indTotal = 0;
      if (!sale) {
        itemTotal = quantity * retail;
      } else {
        itemTotal = quantity * sale;
      }
      items[i].indTotal = itemTotal;
      totalPrice += itemTotal;
      totalItems = totalItems + quantity;
    }
    this.setState({totalAmt: totalPrice.toFixed(2), totalItems: totalItems});
  }

  createItemList() {
    let items = this.state.cart;
    return items.map((item, ind) => (
      <div className="cart-item-list col-sm-12" key={ind}>
        <img src={item._source.image[0]} alt="" className="cart-item-img col-sm-3"></img>
        <div className="col-sm-3">{item._source.product_name}</div>
        <div className="col-sm-2">{item._source.discounted_price}</div>
        <input onChange={e => this.changeQuantity(e, item)} className="col-sm-2" placeholder={item.quantity}/>
        <div className="col-sm-2">{item.indTotal}</div>
      </div>
    ))

  }

  render() {
    return(
      <div className="shopping-cart container-fluid">
        <div>
          <h2>shopping cart</h2>
        </div>
        <div>
          <h3>Your current total amount is: $ {this.state.totalAmt}</h3>
        </div>
        <div className="cart-item-banner col-sm-12">
          <h3 className="col-sm-3"></h3>
          <h3 className="col-sm-3">name</h3>
          <h3 className="col-sm-2">price</h3>
          <h3 className="col-sm-2">quantity</h3>
          <h3 className="col-sm-2">total</h3>
        </div>
        <div className="cart-items col-sm-12">
          {this.createItemList()}
        </div>
        <div className="cart-summary col-sm-12">
          <div className="col-sm-5">
          </div>
          <div className="col-sm-7">
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
            <button onClick={this.handleCheckoutClick}>Checkout</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;
