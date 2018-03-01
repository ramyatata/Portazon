import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import ProductCard from './productCard.jsx';

const ProductsListPage = ({products, query, addItemToCart, changeView, setParentState}) => (
  <div>
    <h3>You searched for: {query}</h3>
    <div className="col-xs-12">
    {products.map((item, ind) => (
        <ProductCard item={item} key={ind} addItemToCart={addItemToCart} changeView={changeView} setParentState={setParentState}/>
      )
    )}
    </div>
  </div>
);

export default ProductsListPage;