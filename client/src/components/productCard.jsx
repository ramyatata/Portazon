import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class ProductCard extends React.Component {
  constructor(props){
    super(props);
  }

  handleAddCartClick(item) {
    item.quantity = 1;
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
      <div className='card col-xs-3' style={{margin: '10px', width: '30rem', border: 'solid 1px grey', padding:'20px 20px'}}>
        <img onClick={() => this.handleCardClick(item)} className='card-img-top' src={item._source.image[0]} alt='Card image cap'/>
        <div className='card-block'>
          <div className='card-price'><span>${item._source.discounted_price.toFixed(2)}</span></div>
          <div className='card-title'><span>{item._source.product_name}</span></div>
          <a href='#' className='btn btn-primary' onClick={() => this.handleAddCartClick(item)}>add to cart</a>
        </div>
      </div>
    );
  }
}

export default ProductCard;