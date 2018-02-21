import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import FeaturedProductCard from './featuredProductCard.jsx';

class FeaturedProducts extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {

    const items = [];

    const item = this.props.featuredProducts.map((item, ind)=>{
      if(ind === 0){
        return(
          <div className="item active">
            <div className="col-xs-2"><img src="http://placehold.it/300/f44336/000000" className="carousel-img"/></div>
          </div>
        );
      } else {
        return <FeaturedProductCard key={ind} product={item}/>
      }
    });


    return (
      <div className="row">
        <div className="col-md-12">
          <div className="carousel slide multi-item-carousel" id="theCarousel">
            <div className="carousel-inner">{items}</div>

             {/* right left navigation */}
            <a className="left carousel-control" href="#theCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
            <a className="right carousel-control" href="#theCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProducts;