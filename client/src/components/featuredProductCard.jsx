import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedProductCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="item">
        <div className="col-xs-2">
          <img className="carousel-img" src={this.props.product.source.image[0]}/>
          <div className="carousel-title">
            <h6>{`$ ${this.props.product.source.discounted_price}`}</h6>
            <span>${this.props.product.sourceproduct_name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProductCard;