import React from 'react';
import ReactDOM from 'react-dom';

import Banner from './banner.jsx';

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
      </div>
    );
  }
}

export default HomePage;