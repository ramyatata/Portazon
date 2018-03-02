import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import Banner from './banner.jsx';
import FeaturedProducts from './featuredProducts.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let changeView = this.props.changeView;
    let submitQuery = this.props.submitQuery;

    let featuredProducts = '';
    if(this.props.featuredProducts.length === 0) {
      featuredProducts = <div></div>
    } else {
      featuredProducts = <FeaturedProducts featuredProducts={this.props.featuredProducts} changeView={changeView}/>
    }

    return (
      <div>
        <Banner/>
        {featuredProducts}
      </div>
    );
  }
}

export default withRouter(HomePage);