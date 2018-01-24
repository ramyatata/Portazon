import React from 'react';
import ReactDOM from 'react-dom';

const ProductDetail = ({item}) => {
  console.log('item in product detail', item)
  // let prod = {
  //   title: 'COPA 18+ TR Premium Navy',
  //   rating: '4',
  //   price: '$230.00',
  //   salePrice: '$150.00',
  //   save: '$80.00',
  //   reviews: '100',
  //   description: 'adidas brings a classic soccer silhouette to the streets with the release of the COPA 18+ TR Premium shoe. A Primeknit® collar wraps around the foot and offers responsive support, while the premium nubuck leather upper construction provides a refined look. BOOST™ spans the full length of the shoe at the midsole, and finishing details like an internal compression sock, a fold-over tongue, and metal lace aglets pull the silhouette together.',
  //   details: ['Premium nubuck leather upper', 'Primeknit® sock collar at ankle','BOOST™ midsole throughout','Rubber outsole','Embossed 3-Stripe stamped branding','Fabric laces with metal aglets','AC7447']
  // }

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

  //prod details
  let prodDetails = prod.details.map((detail, ind)=><li key={ind}>{detail}</li>);

  //quantity Options
  let quantityOptions = [];
  for(let i=1; i<6; i++ ){
    quantityOptions.push(<option value={i}>{i}</option>);
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
          <div className="prod-otherImagesCarousel col-xs-3">
            <ul className="prod-otherImagesList" style={{'marginLeft': '-50px', padding: 'none'}}>
              {thumbnails}
            </ul>
          </div>
          <div className="col-xs-9">
            <div className="prod-productImage">
            <img src="http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-5" style={{paddingRight: '50px', paddingTop: '20px'}}>
        <div className="prod-rightContainer col-xs-12">
          <div className="prod-price">
            <h3 style={{display: 'inline', fontWeight:'600', lineHeight: '1', textTransform: 'uppercase'}}>{prod.salePrice}</h3>
            <p style={{margin: '0px 15px', display: 'inline'}}>Was {prod.price}</p>
            <p style={{display: 'inline', color: 'red'}}>Save {prod.save}</p>
          </div>
          <div className="prod-description">
            <h6>Description</h6>
            {prod.description}
          </div>
          <div className="prod-details">
            <h6>Details</h6>
            <ul>{prodDetails}</ul>
          </div>
          <div className="prod-quant col-xs-12">
            <div className="col-xs-5 form-group">
              <label className="col-xs-6" style={{fontWeight: 'bold', fontSize:'1.2em'}}>Quantity</label>
              <select style={{padding: '10px', borderRadius: '10px', height:'30px', width: '60px'}}>{quantityOptions}
              </select>
            </div>
            <div className="col-xs-7">
              <button type="button" className="btn btn-block" style={{backgroundColor:'#000', color:'White', fontWeight:'bold'}}>ADD TO BAG</button>
            </div>
          </div>
        </div>
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


