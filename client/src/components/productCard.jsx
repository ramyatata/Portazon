import React from 'react';
import ReactDOM from 'react-dom';

class ProductCard extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='card' style='width: 20rem;'>
        <img className='card-img-top' src='...' alt='Card image cap'/>
        <div className='card-block'>
          <h4 className='card-title'>Zoomer Kitty</h4>
          <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href='#' className='btn btn-primary'>add to cart</a>
        </div>
      </div>
      );
  }
}

export default ProductCard;