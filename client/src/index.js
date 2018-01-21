import React from 'react'
import ReactDOM from 'react-dom'

import ShoppingCart from './components/Shoppingcart.jsx';
import HomePage from './components/homePage.jsx';
import ProductsList from './components/productsListPage.jsx';

var axios = require('axios');

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homepage',
      cart: [],
      searchedItems: '',
      query: ''
    }
    this.changeView = this.changeView.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }

  changeView(view){
    this.setState({view: view});
  }

  submitQuery(query) {
    axios.get('search/?q=' + query)
      .then(res => {
        let items = res.data;
        let modItems = parseImageUrls(items);
        this.setState({searchedItems: modItems, query: query, view: 'productsList'});
        //this.changeViewToProductList ?? change the view to list of products by productsListPage?
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
      return <HomePage changeView={this.changeView} submitQuery={this.submitQuery}/>
    } else if (view === 'shoppingCart') {
      return <ShoppingCart cart={this.state.cart}/>
    }  else if (view === 'productsList') {
      return <ProductsList products={this.state.searchedItems}/>
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

function addDecimalInPrice(number) {

  let s = number.toString().split('');
  let last = s[s.length - 1];
  let sec = s[s.length - 2];
  if (last && sec === '9') {
    s.splice(2, 0, '.');
    let n = s.join('');
    return parseFloat(n);
  }
  return number.toFixed(2);
}

function parseImageUrls(items) {
  for (let i = 0; i < items.length; i++) {
    let images = JSON.parse(items[i]._source.image);
    items[i]._source.image = images;
    let retail = items[i]._source.retail_price;
    items[i]._source.retail_price = addDecimalInPrice(retail);
    let discount = items[i]._source.discounted_price;
    items[i]._source.discounted_price = addDecimalInPrice(discount);
  }
  return items;
}

ReactDOM.render(<Hello/>, document.getElementById('root'));


