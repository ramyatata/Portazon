import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, withRouter, Switch} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Header from './header.jsx';
import Footer from './footer.jsx';
import HomePage from './homePage.jsx';
import ShoppingCart from './shoppingCart.jsx';
import ProductsList from './productsListPage.jsx';
import ProductCard from './productCard.jsx';
import ProductDetail from './productDetailPage.jsx';
import CheckOut from './checkOut.jsx';
import RegisterUserForm from './registerUserForm.jsx';
import RegisterSuccess from './registerSuccess.jsx';
import UserProfile from './userProfile.jsx';

//import services from '../../dist/services';



const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homePage',
      cart: [],
      totalAmt: '',
      searchedItems: null,
      query: '',
      productDetail: '',
      userInvoice:'',
      user: '',
      featuredProducts: [],
      badge: 0,
      token: '',
      guestNum:'',
      showAddAlert: false,
      showRemoveAlert: false,
      showAddInvoiceAlert: false

    }
    this.changeView = this.changeView.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.login = this.login.bind(this);
    this.getFeaturedProducts = this.getFeaturedProducts.bind(this);
    this.getCartByUser = this.getCartByUser.bind(this);
    this.logout = this.logout.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.submitInvoice = this.submitInvoice.bind(this);
    this.getCategoryItems = this.getCategoryItems.bind(this);
    this.createGuestUser = this.createGuestUser.bind(this);
    this.getInvoices = this.getInvoices.bind(this);
    // this.setParentState = this.setParentState.bind(this);
    this.clearUserCart - this.clearUserCart.bind(this);
  }


  componentWillMount(){
    this.getFeaturedProducts();
  }

  componentDidMount(){
    this.createGuestUser();
  }

  getFeaturedProducts() {
    axios.get('search?q=rating%205')
      .then(items => {
        let noDupes = cutDuplicates(items.data);
        let filteredImages = filterDuplicateImages(noDupes);
        this.setState({featuredProducts: filteredImages, view: 'homePage'});
      })
      .catch(err => console.log('error fetching five rated products'));
  }

  setParentState(field, value) {
    this.setState({field, value})
  }

  changeView(view, item, invoice){
    // alert(`changing view ${item._source.product_name}`);
    console.log(view, item, invoice)
    this.setState({view: view, productDetail: item, userInvoice: invoice});
    let history = this.props.history;
    if(view === 'productDetail'){
      history.push('/product_detail');
    } else if (view === 'shoppingCart') {
      history.push('/shoppingcart');
    } else if (view === 'checkOut') {
      history.push('/checkout');
    } else if (view === 'registerUserForm') {
      history.push('/register_user');
    } else if (view === 'userProfile') {
      history.push('/user_profile');
    }
  }

  getCategoryItems(category){
    axios.get('/search/category?category=' + category)
    .then(res => {
      let items = res.data;
      let noDupes = cutDuplicates(items);
      let parseImages = parseImageUrls(noDupes);

      if (this.state.view !== 'productsList') {
        this.setState({searchedItems: parseImages, view: 'productsList'});
      } else {
        this.setState({searchedItems: parseImages});
      }
      this.props.history.push('/products');
    })
  }

  login(user) {
    axios.post('users/login', user)
      .then(user => {
        this.setState({user: user.data.user, view: 'homePage', token: user.data.token});
        this.props.history.push('/');
        window.localStorage.setItem('token', user.data.token);
        this.getCartByUser();
      })
      .catch(err => alert('Oops! Incorrect Email and/or password combination'));

  }

  logout() {
    let user = this.state.user;
    axios.get('users/logout', user)
      .then(response => {
        alert('Successfully logged out!')
        this.setState({user: {firstname: 'Guest'}})
      })
      .catch(err => console.log('err logging out', err))
  }

  registerUser(user) {
    axios.post('users/registerUser', user)
      .then(response => {
        this.props.history.push('/register_success');
      })
      .catch(err => console.log('err', err))
  }

  createGuestUser() {
    var guestNo = 0;
    var Guest = function() {
      this.cart = [];
      this.guestNumber = guestNo;
      this.firstname = 'Guest';
    }
    var newGuest = new Guest();
    this.setState({guestNum: guestNo, user: newGuest})
  }


  submitQuery(query) {
    axios.get('search/?q=' + query)
      .then(res => {
        let items = res.data;
        let noDupes = cutDuplicates(items);
        let parseImages = parseImageUrls(noDupes);

        if (this.state.view !== 'productsList') {
          this.setState({searchedItems: parseImages, query: query, view: 'productsList'})
        } else {
          if(!query) {
            this.setState({searchedItems: parseImages});
          } else {
            this.setState({searchedItems: parseImages, query: query});
         }
        }
        this.props.history.push('/products');
      })
    }

  getCartByUser(field) {
    let token = window.localStorage.getItem('token');
    let curUser = {
      userID: this.state.user.id,
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
    };
    if (this.state.user.id) {
      axios.get('users/cart', {
        params: curUser,
        headers: {'x-access-token': token}
      })
        .then(response => {
          let userCart = response.data;
          console.log('reponse getting cart', response)
          let newState = {cart: userCart, badge: userCart.length};
          if (field) {
            newState[field] = true;
          }
          this.setState(newState);
        })
        .catch(err => console.log('err getting cart', err))
    } else {
      let gCart = this.state.user.cart;
      // console.log('field', this.state[field] ,field)
      let newState = {cart: gCart, badge: gCart.length};
      if (field) {
        newState[field] = true;
        this.setState(newState);
      } else {
        this.setState({
          cart: gCart,
          badge: gCart.length
        })
      }
    }
  }

  changeQuantity(item){
    if (this.state.user.id) {
      item.userID = this.state.user.id;
      item.email = this.state.user.email;
      item.deleteItem = false;
      let token = window.localStorage.getItem('token');
      axios.post('users/updateCart', item, {
        headers: {'x-access-token': token}})
        .then(response => {
          console.log('changed quantity!', response);
          this.getCartByUser();
          // alert('Quantity has been updated!')
        })
        .catch(err => console.log('err changing quantity', err));
    } else {
      let cart = this.state.user.cart;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productID === item.productID) {
          cart[i] = item;
        }
      }
      this.getCartByUser();
    }
  }

  addItemToCart(item) {
    var price;
    if (!item._source.discounted_price) {
      price = item._source.retail_price
    } else {
      price = item._source.discounted_price;
    }
    let productName = item._source.product_name;
    let name = productName.replace(/"/g, '');

    var obj = {
      productID: item._id,
      productName: name,
      amount: item.quantity,
      price: price,
      image_url: item._source.image[0],
      deleteItem: false
    };
    if (this.state.user.id) {
      obj.userID = this.state.user.id;
      obj.email = this.state.user.email;
      let token = window.localStorage.getItem('token');
      axios.post('users/updateCart', obj, {headers: {'x-access-token': token}})
        .then(response => {
          this.getCartByUser('showAddAlert');
        })
        .catch(err => console.log(err))
    } else {
      let user = this.state.user;
      obj.image = [item._source.image[0]];
      user.cart.push(obj);
      this.getCartByUser('showAddAlert');
    }
  }

  removeItemFromCart(item) {
    var obj = {
      productName: item.productName,
      productID: item.productID,
      amount: item.amount,
      deleteItem: true
    }
    if (this.state.user.id) {
      obj.userID = this.state.user.id;
      obj.email = this.state.user.email;
      let token = window.localStorage.getItem('token');
      axios.post('users/updateCart', obj, {headers: {'x-access-token': token}})
        .then(response => {
          this.getCartByUser('showRemoveAlert');
        })
        .catch(err => console.log('err deleting item', err))
    } else {
      let user = this.state.user;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].productName === item.productName) {
          user.cart.splice(i, 1);
        }
      }
      this.getCartByUser('showRemoveAlert');
    }
  }

  submitInvoice(guest) {
    let cart = this.state.cart;
    let chargedAmt = cart.reduce((sum, item) => {
      sum += (item.amount * item.price);
      return sum;
    }, 0);
    let invoice = {
      cart: this.state.cart,
      charged: chargedAmt,
      date: new Date()
    };

    if (this.state.user.id) {
      invoice.userID = this.state.user.id;
      invoice.email = this.state.user.email;
      let token = window.localStorage.getItem('token');
      axios.post('users/updateInvoices', invoice, {headers: {'x-access-token': token}})
        .then(response => {
          this.getInvoices('showAddInvoiceAlert');
          this.clearUserCart();

        })
        .catch(err => console.log('err adding invoice', err))
    } else {
      invoice.firstname = guest.firstname;
      invoice.lastname = guest.lastname;
      invoice.shippingAddress = guest.shippingAddress;
      invoice.email = guest.email;
      axios.post('users/guestUpdateInvoices', invoice)
        .then(response => {
          this.setState({showAddInvoiceAlert: true});
        })
        .catch(err => console.log('err submitting guest invoice'))
    }
  }

  clearUserCart() {
    let token = window.localStorage.getItem('token');
    let obj = {clearCart: true, userID: this.state.user.id, email: this.state.user.email}
    axios.post('users/updateCart', obj, {headers: {'x-access-token': token}})
    .then(response => {
      console.log('response in clear cart', response)
      this.getCartByUser();
    })
    .catch(err => {console.log('err clearing cart', err)})
  }


  getInvoices(field) {
    let user = {
      userID: this.state.user.id,
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
    }
    let token = window.localStorage.getItem('token');
    axios.get('users/invoices', {
      params: user,
      headers: {'x-access-token': token}
    })
      .then(response => {
        let obj = {invoices: response.data};
        obj[field] = true;
        this.setState(obj)
      })
      .catch(err => console.log('err getting invoices', err))
  }

  renderAlert() {
    if (this.state.showAddAlert) {
      return (
        <div>
          <Alert bsStyle="success" onDismiss={() => this.handleDismissAlert('showAddAlert')}>
            <h4>Success!!</h4>
            <p>The item was added to your cart!</p>
          </Alert>
        </div>
      )
    } else if (this.state.showRemoveAlert) {
      return (
        <div >
          <Alert bsStyle="success" onDismiss={() => this.handleDismissAlert('showRemoveAlert')}>
            <h4>Success!!</h4>
            <p>The item was removed to your cart!</p>
          </Alert>
        </div>
      )
    } else if (this.state.showAddInvoiceAlert) {
      return (
        <div>
          <Alert bsStyle="success" onDismiss={() => this.handleDismissAlert('showAddInvoiceAlert')}>
            <h4>Success!!</h4>
            <p>Your order has been processed!</p>
          </Alert>
        </div>
        )
    } else {
      return null;
    }
  }

  handleDismissAlert(alert) {
    let obj = {};
    obj[alert] = false;
    this.setState(obj);
  }

  render() {
    return (
      <div className="container-fluid">
        <Header changeView={this.changeView} submitQuery={this.submitQuery} login={this.login} user={this.state.user} logout={this.logout} badge={this.state.badge} getCategoryItems={this.getCategoryItems}/>
        {this.renderAlert()}
        <Switch>
          <Route exact path='/'
            render={() => <HomePage user={this.state.user} changeView={this.changeView} submitQuery={this.submitQuery} featuredProducts={this.state.featuredProducts}/>}>
          </Route>
          <Route exact path='/products'
            render={() => <ProductsList products={this.state.searchedItems} query={this.state.query} addItemToCart={this.addItemToCart} submitQuery={this.submitQuery} changeView={this.changeView}
              setParentState={this.setParentState}
            />  }>
          </Route>
          <Route exact path='/product_detail'
            render={() => <ProductDetail item={this.state.productDetail}
            addItemToCart={this.addItemToCart}/>  }>
          </Route>
          <Route exact path='/shoppingcart'
            render={() => <ShoppingCart cart={this.state.cart} changeView={this.changeView} getCart={this.getCartByUser} removeItemFromCart={this.removeItemFromCart} changeQuantity={this.changeQuantity}/>  }>
          </Route>
          <Route exact path='/checkout'
            render={() => <CheckOut user={this.state.user} submitInvoice={this.submitInvoice} changeView={this.changeView}/>  }>
          </Route>
          <Route exact path='/register_user'
            render={() => <RegisterUserForm registerUser={this.registerUser}/>  }>
          </Route>
          <Route exact path='/register_success'
            render={() => <RegisterSuccess /> }>
          </Route>
          <Route exact path='/user_profile'
            render={() => <UserProfile user={this.state.user} invoices={this.state.invoices} getInvoices={this.getInvoices}/> }>
          </Route>
          <Route path='*' component={HomePage}></Route>
        </Switch>
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

function filterDuplicateImages(items){
  let list = [];
  let noDupesList = [];
  for(let i = 0; i < items.length; i++) {
    let images = JSON.parse(items[i]._source.image);
    if(list.indexOf(images[0]) == -1){
      list.push(images[0]);
      noDupesList.push(items[i]);
    }
  }
  return noDupesList;
}

export default withRouter(App);



/*
      { <div>
        <Alert bsStyle="success" onDismiss={() => this.handleDismissAlert('showAddInvoiceAlert')}>
          <h4>Success!!</h4>
          <p>Your order has been processed!</p>
        </Alert>
        </div>
*/

