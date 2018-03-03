import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedProductCard extends React.Component {
  constructor(props){
    super(props);

    this.props.product._source.image = JSON.parse(this.props.product._source.image);

    this.state = {
      item: this.props.product
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    console.log(this.state.item._source.product_name);
    console.log(this.props.product._source.product_name);
    //this.props.product._source.image = JSON.parse(this.props.product._source.image);
    //this.props.changeView('productDetail', this.state.item);
  }

  render() {
    //let item = this.props.product;
    //let image = JSON.parse(this.state.item._source.image)[0];
    //item._source.image = JSON.parse(item._source.image);

    let image = this.state.item._source.image[0];

    return (
        <div className="col-xs-2" style={{'padding': '20px'}}>
          <img className="carousel-img" src={image} style={{'width': '150px', 'height': '150px', overflow: 'hidden'}}/>
          <div className="carousel-title">
            <h5>$ {this.props.product._source.discounted_price}</h5>
            <div style={{height: '60px', overflow: 'hidden'}}>
              <span style={{align:'text-center'}}>{this.props.product._source.product_name}</span>
            </div>
          </div>
        </div>
    );
  }
}

export default FeaturedProductCard;