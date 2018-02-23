import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedProductCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.product._source.product_name);
    return (
      <div className="item active">
        <div className="col-xs-2">
          <img className="carousel-img" src="http://placehold.it/300/f44336/000000"/>
          <div className="carousel-title">
            <h6>{this.props.product._source.discounted_price}</h6>
            <span>${this.props.product._source.product_name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProductCard;