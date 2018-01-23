import React from 'react';
import ReactDOM from 'react-dom';

const ProductDetail = (props) => {
  return(
    <div>
      <div className="col-xs-7 prod-leftContainer">
        <div className="prod-detailTitle"></div>
        <div className="prod-secondaryInfo"></div>
        <div className="prod-imageContainer">
          <div className="prod-otherImages col-xs-2"></div>
          <div className="prod-productImage col-xs-10"></div>
        </div>
      </div>
      <div className="col-xs-5 prod-rightContainer">
        <div className="prod-price"></div>
        <div className="prod-description"></div>
        <div className="prod-details"></div>
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


