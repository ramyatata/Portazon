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

  // renderAlert() {
  //   let setParentState = this.props.setParentState;
  //   console.log('in render alert roduct card', this.props.itemAdded);
  //   // if (this.props.itemAdded) {

  //   // }
  // }

  render(){
    let item = this.props.item;
    let price = '';

    if (!item._source.discounted_price) {
      price= item._source.retail_price;
    } else {
      price = item._source.discounted_price;
    }
    return(
      <div className='card col-xs-3' style={{margin: '10px', width: '32rem', padding:'10px', 'backgroundColor': '#fff'}}>
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