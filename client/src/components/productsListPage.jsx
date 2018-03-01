import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import ProductCard from './productCard.jsx';

const ProductsListPage = ({products, query, addItemToCart, changeView}) => (
  <div className="col-xs-12">
    <h5 className={{'paddingLeft': '5px'}}>Search: {query}</h5>
    <div>
    {products.map((item, ind) => (
        <ProductCard item={item} key={ind} addItemToCart={addItemToCart} changeView={changeView}/>
      )
    )}
    </div>
  </div>
);

export default ProductsListPage;