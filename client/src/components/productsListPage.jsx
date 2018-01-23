import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductCard from './productCard.jsx';


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
        </div>

);

export default ProductsListPage;