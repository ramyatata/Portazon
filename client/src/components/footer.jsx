import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
        <div className='footer-container'>
          <div className='col-xs-12 main-footer'>
            <div className='col-xs-4 footer-section'>
              <h6>CUSTOMER SERVICE</h6>
                <span><a href="/contact">CONTACT</a></span>
                <span><a href="/shippingRates">SHIPPING RATES</a></span>
                <span><a href="/policies">POLICIES</a></span>
                <span><a href="/faq">FAQ</a></span>
            </div>
            <div className='col-xs-4 footer-section'>
              <h6>FOLLOW US</h6>
              <span className='fa fa-facebook fa-lg'><a href="https://www.facebook.com" target="_blank"></a></span>
              <span className='fa fa-twitter fa-lg'><a href="https://www.twitter.com" target="_blank"></a></span>
              <span className='fa fa-instagram fa-lg'><a href="https://www.instagram.com" target="_blank"></a></span>
              <span className='fa fa-pinterest fa-lg'><a href="https://www.pinterest.com" target="_blank"></a></span>
            </div>
            <div className='col-xs-4 footer-section'>
              <h6>NEWSLETTER</h6>
              <div className="input-group margin-bottom-sm col-xs-8 col-xs-offset-2 text-center">
                <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                <input className="form-control" type="text" placeholder="Email address"/>
              </div>
              </div>
            </div>
          <div className='col-xs-12 sub-footer'>
          <i className="fa fa-copyright fa-lg" aria-hidden="true"></i>
          <span>COPYRIGHT 2018 PORTAZON. ALL RIGHTS RESERVED</span>
          </div>
        </div>
    );
  }
}

export default Footer;