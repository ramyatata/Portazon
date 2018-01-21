import React from 'react'
import ReactDOM from 'react-dom'

import ShoppingCart from './components/Shoppingcart.jsx';
import HomePage from './components/homePage.jsx';
import ProductsList from './components/productsListPage.jsx';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homepage',
      cart: []
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(view){
    this.setState({view: view});
  }

  getProductsByQuery(query) {
    $.ajax({
      method: 'get',
      url: '/search/:query',
      success: (response) => {
        console.log('success in get request by query string!', response)
      },
      error: (err) => {
        console.log('err getting data', err);
      }
    })
  }

  addItemToCart(item) {
    //this function should have an input of an object that represents a single item
    //we then need to do an ajax POST request to the server to addItemToCart
    //the data we need to send with this request is the item object
    //upon success:
    //we should update the users shopping cart by setting the state
    //upon error:
    //console log the error and see whats happening!

    //for now:
    this.state.cart.push(item);
  }

  removeItemFromCart(item) {
    //this function should have an input of an item object
    //we then need to do an ajax POST request to the server to removeItemFromCart
    //the data we need to send with this post request is the item object
    //upon success:
    //we should update the users cart to reflect the removed item
    //upon error:
    //console log the error and see whats happening!!

    //for now:
    let cart = this.state.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] === item) {
        cart.splice(i, 1);
        return;
      }
    }
    return;
  }

  renderView() {

    let view = this.state.view;
    if (view === 'homepage') {
      return <HomePage changeView={this.changeView}/>
    } else if (view === 'shoppingCart') {
      return <ShoppingCart cart={this.state.cart}/>
    }  else if (view === 'productsList') {
      return <ProductsList/>
    }else {
      return null;
    }
  }

  render() {
    return (
      <div>

        <div>
          {this.renderView()}
        </div>
      </div>
      );
  }
}

ReactDOM.render(<Hello/>, document.getElementById('root'));


