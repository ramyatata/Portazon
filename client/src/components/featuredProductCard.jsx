import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedProductCard extends React.Component {
  constructor(props){
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(item) {
    alert('local');
    this.props.changeView('productDetail', item);
  }

  render() {
    let item = this.props.product;
    let image = JSON.parse(this.props.product._source.image)[0];

    return (
      <div className="item" >
        <div className="col-xs-2" style={{'padding': '20px'}} onClick={() => this.handleClick}>
          <img className="carousel-img" src={image} style={{'width': '150px', 'height': '150px', overflow: 'hidden'}}/>
          <div className="carousel-title">
            <h5>$ {this.props.product._source.discounted_price}</h5>
            <div style={{height: '60px', overflow: 'hidden'}}>
              <span style={{align:'text-center'}}>{this.props.product._source.product_name}</span>
            </div>
            <button className="btn btn-cart" onClick={() => this.handleButtonClick(item)} >Shop This Product</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProductCard;