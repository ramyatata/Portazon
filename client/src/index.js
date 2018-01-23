import React from 'react'
import ReactDOM from 'react-dom'

<<<<<<< HEAD
import ShoppingCart from './components/Shoppingcart.jsx';
import HomePage from './components/homePage.jsx';
import ProductsList from './components/productsListPage.jsx';
=======
import ShoppingCart from './components/shoppingCart.jsx';
import HomePage from './components/homePage.jsx';
import ProductsList from './components/productsListPage.jsx';
import ProductCard from './components/productCard.jsx';
import Header from './components/header.jsx';

var axios = require('axios');
>>>>>>> 6d93f95915e5c0dc974667cc85bc4a8d109794b5

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      view: 'productsList',
      cart: []
=======
      view: 'homepage',
      cart: null,
      searchedItems: null,
      query: ''
>>>>>>> 6d93f95915e5c0dc974667cc85bc4a8d109794b5
    }
    this.changeView = this.changeView.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  changeView(view){
    this.setState({view: view});
  }

  submitQuery(query) {
    axios.get('search/?q=' + query)
      .then(res => {
        // console.log('response', res.data)
        let items = res.data;
        let modItems = parseImageUrls(items);
        console.log('modItems', modItems)
        if (this.state.view !== 'productsList') {
          this.setState({searchedItems: modItems, query: query, view: 'productsList'})
        } else {
          this.setState({searchedItems: modItems, query: query});
          //even though I set the state, it isn't updating the product list component?! what the heck!?
        }
      })
    }

  addItemToCart(item) {
    console.log('in add item to cart', item)
    let cart = this.state.cart;
    item.quantity = 1;
    if (!cart) {
      this.setState({cart: [item]})
    } else {
      console.log('cart to be pushed', cart)
      let update = cart.push(item);
      // console.log('updated', update)
      this.setState({cart: cart});
    }
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
<<<<<<< HEAD
      return <ProductsList/>
=======
      return <ProductsList
        products={this.state.searchedItems}
        query={this.state.query}
        addItemToCart={this.addItemToCart}
        submitQuery={this.submitQuery}
        />
>>>>>>> 6d93f95915e5c0dc974667cc85bc4a8d109794b5
    }else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Header changeView={this.changeView} submitQuery={this.submitQuery}/>
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
  if (last === '9' && sec === '9') {
    s.splice(2, 0, '.');
    let n = s.join('');
    return parseFloat(n);
  }
  return number;
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


