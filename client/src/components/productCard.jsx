import React from 'react';
import ReactDOM from 'react-dom';

class ProductCard extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    // console.log('in product card item:', this.props.item )
    let item = this.props.item;
    return(
      <div className='card col-xs-3' style={{margin: '10px', width: '30rem', border: 'solid 1px grey', padding:'20px 20px'}}>
        <img className='card-img-top' src={item._source.image[0]} alt='Card image cap'/>
        <div className='card-block'>
          <h4 className='card-title'>{item._source.product_name}</h4>
          <p className='card-text'>{item._source.description}}</p>
          <h5 className='card-price'>{item._source.discounted_price.toFixed(2)}</h5>
          <a href='#' className='btn btn-primary'>add to cart</a>
        </div>
      </div>
    );
  }
}

export default ProductCard;