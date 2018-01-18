import React from 'react'
import ReactDOM from 'react-dom'


class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
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
    return (
        <div>Hello rendering using react</div>
      );
  }
}

ReactDOM.render(<Hello/>, document.getElementById('root'));