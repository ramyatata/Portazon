import React from 'react';
import ReactDOM from 'react-dom';

import ShoppingCart from './components/Shoppingcart.js';


class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'shoppingCart'
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

  renderView() {
    console.log('in render view', this.state.view)
    let view = this.state.view;
    if (view === 'homepage') {
      return <HomePage/>
    } else if (view === 'shoppingCart') {
      return <ShoppingCart />
    } else {
      return null;
    }
  }

  render() {
    console.log('rendering page', this.state.view)
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