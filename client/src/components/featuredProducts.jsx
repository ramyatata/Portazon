import React from 'react';
import ReactDOM from 'react-dom';
import FeaturedProductCard from './featuredProductCard.jsx';

class FeaturedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount(){
    //carousel
    $('.carousel .item').siblings(':first').addClass('active');
    $('#myCarousel').carousel({
      interval: false
    });


    $('.carousel .item').each(function(){
        var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });
  }

  render() {
    let highRatedProducts = [];

    if(this.props.featuredProducts.length === 0){
      highRatedProducts = <div></div>
    } else {
      highRatedProducts = this.props.featuredProducts.map((prod, ind)=><FeaturedProductCard product={prod} key={ind} changeView={this.props.changeView} />)
    }

    return (
      <div className="col-xs-12" style={{marginBottom: '15px'}}>
        <div className="col-xs-12 text-center"><h3>High Rated Products</h3></div>
        <div className="col-xs-12">
          <div className="carousel slide" id="myCarousel">
            <div className="carousel-inner" >
              {highRatedProducts}
            </div>
            <a className="left carousel-control" href="#myCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedProducts;
