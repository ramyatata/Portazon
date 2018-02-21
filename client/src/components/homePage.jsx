import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import Banner from './banner.jsx';
import FeatureProducts from './featureProducts.jsx';

class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let changeView = this.props.changeView;
    let submitQuery = this.props.submitQuery;
    return(
      <div>
        <Banner/>
        <FeatureProducts/>
      </div>
    );
  }
}

export default withRouter(HomePage);