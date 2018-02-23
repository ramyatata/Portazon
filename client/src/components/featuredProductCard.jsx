import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedProductCard extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    //console.log(this.props.product);
    let image = JSON.parse(this.props.product._source.image)[0];
    return (
      <div className="item" >
        <div className="col-xs-2" style={{'padding': '20px'}}>
          <img className="carousel-img" src={image} style={{'width': '150px', 'height': '150px', overflow: 'hidden'}}/>
          <div className="carousel-title">
            <h4>$ {this.props.product._source.discounted_price}</h4>
            <span style={{align:'text-center'}}>{this.props.product._source.product_name}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProductCard;