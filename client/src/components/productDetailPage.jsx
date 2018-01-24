import React from 'react';
import ReactDOM from 'react-dom';

const ProductDetail = (props) => {

  let prod = {
    title: 'COPA 18+ TR Premium Navy',
    rating: '4',
    price: '$230.00',
    reviews: '100',
    description: 'adidas brings a classic soccer silhouette to the streets with the release of the COPA 18+ TR Premium shoe. A Primeknit® collar wraps around the foot and offers responsive support, while the premium nubuck leather upper construction provides a refined look. BOOST™ spans the full length of the shoe at the midsole, and finishing details like an internal compression sock, a fold-over tongue, and metal lace aglets pull the silhouette together.',
    details: ['Premium nubuck leather upper', 'Primeknit® sock collar at ankle','BOOST™ midsole throughout','Rubber outsole','Embossed 3-Stripe stamped branding','Fabric laces with metal aglets','AC7447']
  }

  //ratings
  let ratingStars = [];
  for(let i = 0; i < 5; i++) {
    ratingStars.push(<span><i className="fa fa-star"></i></span>);
  }

  //thumbnails
  let thumbnails = [];
  for(let i = 0; i < 4; i++) {
    thumbnails.push(
      <li style={{left: '0px', top: '0px'}}>
        <div className="prod-otherImage">
          <img src="http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg" role="button"></img>
        </div>
      </li>
    );
  }


  return(
    <div className="col-xs-12" style={{padding: '10px'}}>
      <div className="col-xs-7 prod-leftContainer" >
        <div className="prod-detailTitle">
          <h3>{prod.title}</h3>
        </div>
        <div className="prod-secondaryInfo">
          <div className="prod-rating">{ratingStars}</div>
          <div className="prod-reviews">
            <span>{prod.reviews}</span>
            <span>Reviews</span>
          </div>
        </div>
        <div className="prod-imageContainer">
          <div className="prod-otherImagesCarousel col-xs-2">
            <ul className="prod-otherImagesList" style={{'margin-left': '-50px', padding: 'none'}}>
              {thumbnails}
            </ul>
          </div>
          <div className="col-xs-10">
            <div className="prod-productImage">
            <img src="http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-5 prod-rightContainer">
        <div className="prod-price">{prod.price}</div>
        <div className="prod-description">{prod.description}</div>
        <div className="prod-details">{prod.details}</div>
        <div className="prod-quant"></div>
      </div>
      <div className="col-xs-12 prod-related">
        <div className="col-xs-12 prod-relatedHeading"></div>
        <div className="col-xs-12 prod-realtedCarouselContainer">
          <ul className="prod-relatedSliderList"></ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;


