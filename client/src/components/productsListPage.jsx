import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ProductCard from './productCard.jsx';

class ProductListPage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div>
          <Header></Header>
          <h3>Robotics</h3>
          <ProductCard></ProductCard>
          <Footer/>
        </div>
      );
  }
}

export default ProductListPage