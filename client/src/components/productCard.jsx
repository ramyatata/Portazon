import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class ProductCard extends React.Component {
  constructor(props){
    super(props);
  }

  handleAddCartClick(item) {
    console.log('in handleAddCartClick')
    item.quantity = 1;
    console.log('item to add in productCard', item)
    this.props.addItemToCart(item);
  }

  handleCardClick(item) {
    this.props.changeView('productDetail', item);
  }

  render(){
    let item = this.props.item;
    let price = '';

    if (!item._source.discounted_price) {
      price= item._source.retail_price;
    } else {
      price = item._source.discounted_price;
    }
    return(
      <div className='card col-xs-2' style={{margin: '10px', padding: '10px', width: '30rem', border: 'solid 1px grey', cursor: 'pointer'}}>
        <img onClick={() => this.handleCardClick(item)} className='card-img-top' src={item._source.image[0]} alt='Card image cap'/>
        <div className='card-block'>
          <div className='card-price'><span>${item._source.discounted_price.toFixed(2)}</span></div>
          <div className='card-title'><span>{item._source.product_name}</span></div>
          <a href='#' className='btn btn-block btn-cart' onClick={() => this.handleAddCartClick(item)}>ADD TO CART</a>
        </div>
      </div>
    );
  }
}

export default ProductCard;