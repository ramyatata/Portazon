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
    let highRatedProducts = []
    if(this.props.featuredProducts.length === 0){
      highRatedProducts = <div></div>
    } else {
      highRatedProducts = this.props.featuredProducts.map((prod, ind)=><FeaturedProductCard product={prod} key={ind}/>)
    }

    return (
      <div>
        <div className="col-lg-8 text-center"><h3>High Rated Products</h3></div>
        <div className="col-lg-10 col-md-offset-1">
          <div className="carousel slide" id="myCarousel">
            <div className="carousel-inner">
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



// <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/e477e4/fff&amp;text=2" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/eeeeee&amp;text=3" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/f4f4f4&amp;text=4" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/f566f5/333&amp;text=5" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/f477f4/fff&amp;text=6" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/eeeeee&amp;text=7" className="img-responsive"/></a></div>
//     </div>
//     <div className="item">
//       <div className="col-lg-2"><a href="#"><img src="http://placehold.it/500/fcfcfc/333&amp;text=8" className="img-responsive"/></a></div>
//     </div>