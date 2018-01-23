import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductCard from './productCard.jsx';

<<<<<<< HEAD
class ProductListPage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){

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
=======
const ProductsListPage = ({products, query, addItemToCart}) => (
          <div>
           <h3>You searched for: {query}</h3>
           <div className="col-xs-12">
            {products.map((item, ind) => (
                <ProductCard item={item} key={ind} addItemToCart={addItemToCart}/>
              )
            )}
           </div>
           <Footer/>
>>>>>>> 6d93f95915e5c0dc974667cc85bc4a8d109794b5
        </div>

);

export default ProductsListPage;