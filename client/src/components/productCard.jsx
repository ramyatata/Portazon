import React from 'react';
import ReactDOM from 'react-dom';

class ProductCard extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='card col-xs-3' style={{margin: '10px', width: '30rem', border: 'solid 1px grey', padding:'20px 20px'}}>
        <img className='card-img-top' src='http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg' alt='Card image cap'/>
        <div className='card-block'>
          <h4 className='card-title'>Zoomer Kitty</h4>
          <p className='card-text'>Some quick example </p>
          <h5 className='card-price'>$50.00</h5>
          <a href='#' className='btn btn-primary'>add to cart</a>
        </div>
      </div>
    );
  }
}

export default ProductCard;