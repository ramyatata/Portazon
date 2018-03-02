import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import ProductCard from './productCard.jsx';

const ProductsListPage = ({products, query, addItemToCart, changeView, setParentState}) => (
  <div>
    <h3 style={styles.searchText}>searched: {query}</h3>
    <div className="col-xs-12" style={styles.background}>
    {products.map((item, ind) => (
        <ProductCard item={item} key={ind} addItemToCart={addItemToCart} changeView={changeView} setParentState={setParentState}/>
      )
    )}
    </div>
  </div>
);

const styles = {
  searchText: {
    'color': '#2BABBC',
    'paddingLeft': '5px'
  },
  background: {
    'backgroundColor': '#ededed'
  }
}

export default ProductsListPage;