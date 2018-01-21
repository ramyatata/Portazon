import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductCard from './productCard.jsx';

class ProductsListPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: this.props.products
    }
    this.createProductCards = this.createProductCards.bind(this);
  }

  createProductCards() {
    console.log('in create product card')
    let products = this.state.products;
    console.log('products', products)
    return products.map((item, ind) => (
        <ProductCard item={item} key={ind}/>
      )
    )
  }


  render(){
    // console.log('products in product page', this.state.products)
    return(
        <div>
          <Header></Header>
          <h3>You searched for: {this.props.query}</h3>
          <div className="col-xs-12">
            {this.createProductCards()}
          </div>
          <Footer/>
        </div>
      );
  }
}

export default ProductsListPage;