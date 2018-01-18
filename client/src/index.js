import React from 'react'
import ReactDOM from 'react-dom'


import ShoppingCart from './components/Shoppingcart.jsx';


class Hello extends React.Component {
  constructor(props) {
    super(props);
    //we need to make tabs on the homepage that will change the view in state
    //right now, the default page should be the homepage
    //the user should be able to click on a "shopping cart" tab somewhere and it should rerender
    //to be the shopping cart component
    //we also need to implement the homepage and what it displays.
    this.state = {
      view: 'homepage',
      cart: []
    }
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
  }

  removeItemFromCart(item) {
    //this function should have an input of an item object
    //we then need to do an ajax POST request to the server to removeItemFromCart
    //the data we need to send with this post request is the item object
    //upon success:
    //we should update the users cart to reflect the removed item
    //upon error:
    //console log the error and see whats happening!!
  }

  renderView() {

    let view = this.state.view;
    if (view === 'homepage') {
      return <HomePage/>
    } else if (view === 'shoppingCart') {
      return <ShoppingCart cart={this.state.cart}/>
    } else {
      return null;
    }
  }

  render() {
    console.log('rendering page why isn\'t this working!!! test', this.state.view)
    alert('rendering page!!!!')
    return (
      <div>
        <div>Hello rendering using react!!!</div>

        <div>
          {this.renderView()}
        </div>

      </div>
      );
  }
}

ReactDOM.render(<Hello/>, document.getElementById('root'));


