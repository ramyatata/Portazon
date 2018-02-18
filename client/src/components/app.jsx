import React from 'react'
import ReactDOM from 'react-dom'

import Header from './header.jsx';
import Footer from './footer.jsx';
import HomePage from './homePage.jsx';
import ShoppingCart from './shoppingCart.jsx';
import ProductsList from './productsListPage.jsx';
import ProductCard from './productCard.jsx';
import ProductDetail from './productDetailPage.jsx';
import CheckOut from './checkOut.jsx';
import RegisterUserForm from './registerUserForm.jsx';

var axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homePage',
      cart: null,
      totalAmt: '',
      searchedItems: null,
      query: '',
      productDetail: '',
      userInvoice:''
    }
    this.changeView = this.changeView.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.registerUser = this.registerUser.bind(this);

  }

  changeView(view, item, invoice){
    this.setState({view: view, productDetail: item, userInvoice: invoice});
  }

  submitQuery(query) {
    axios.get('search/?q=' + query)
      .then(res => {
        console.log('response', res.data)
        let items = res.data;
        let noDupes = cutDuplicates(items);
        let parseImages = parseImageUrls(noDupes);

        console.log('modItems', parseImages)
        if (this.state.view !== 'productsList') {
          this.setState({searchedItems: parseImages, query: query, view: 'productsList'})
        } else {
          this.setState({searchedItems: parseImages, query: query});
        }
      })
    }

  addItemToCart(item) {
    let cart = this.state.cart;
    item.quantity = 1;
    if (!cart) {
      this.setState({cart: [item]})
    } else {
      let update = cart.push(item);
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

  registerUser(user) {
    console.log('in registerUser in index', user)
  }

  renderView() {
    let view = this.state.view;
    if (view === 'homePage') {
      return <HomePage changeView={this.changeView} submitQuery={this.submitQuery}/>
    } else if (view === 'shoppingCart') {
      return <ShoppingCart
        cart={this.state.cart}
        changeView={this.changeView}
        />
    }  else if (view === 'productsList') {
      return <ProductsList
        products={this.state.searchedItems}
        query={this.state.query}
        addItemToCart={this.addItemToCart}
        submitQuery={this.submitQuery}
        changeView={this.changeView}
        />
    } else if(view === 'productDetail'){
      return <ProductDetail
        item={this.state.productDetail}
        addItemToCart={this.addItemToCart}
        />
    } else if (view === 'checkOut'){
      return <CheckOut />
    } else if (view === 'registerUserForm'){
      return <RegisterUserForm
        registerUser={this.registerUser}
        />
    } else {
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
        <Footer/>
      </div>
      );
  }
}

function parseImageUrls(items) {
  for (let i = 0; i < items.length; i++) {
    let images = JSON.parse(items[i]._source.image);
    items[i]._source.image = images;
    if (items[i]._source.discounted_price === null || !items[i]._source.retail_price === null) {
      items.splice(i, 1);
    }
  }
  return items;
}

function cutDuplicates(items) {
  let list = [];
  let newItemList = [];

  for (let i = 0; i < items.length; i++) {
    if (!list.includes(items[i]._source.product_name)) {
      list.push(items[i]._source.product_name);
      newItemList.push(items[i])
    }
  }
  return newItemList;
}

export default App;




