import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import ProductCard from './productCard.jsx';

const ProductsListPage = ({products, query, addItemToCart, changeView, setParentState}) => (
  <div>
    <h5 className={{'paddingLeft': '5px'}}>Search: {query}</h5>
    <div className="col-xs-12" style={{'backgroundColor': '#ededed'}}>
    {products.map((item, ind) => (
        <ProductCard item={item} key={ind} addItemToCart={addItemToCart} changeView={changeView} setParentState={setParentState}/>
      )
    )}
    </div>
  </div>
);

export default ProductsListPage;