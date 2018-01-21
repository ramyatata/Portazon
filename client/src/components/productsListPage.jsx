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
  }
  render(){
    console.log('products in product page', this.state.products)
    return(
        <div>
          <Header></Header>
          <h3>Robotics</h3>
          <div className="col-xs-12">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          </div>
          <Footer/>
        </div>
      );
  }
}

export default ProductsListPage;