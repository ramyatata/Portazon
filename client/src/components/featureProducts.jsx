import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

class FeatureProducts extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="carousel slide multi-item-carousel" id="theCarousel">
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/f44336/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/e91e63/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/9c27b0/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/673ab7/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/4caf50/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/8bc34a/000000" className="img-responsive"/></a></div>
              </div>
              <div className="item">
                <div className="col-xs-2"><a href="#1"><img src="http://placehold.it/300/8bc34a/000000" className="img-responsive"/></a></div>
              </div>
            </div>
             {/* right left navigation */}
            <a className="left carousel-control" href="#theCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
            <a className="right carousel-control" href="#theCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default FeatureProducts;