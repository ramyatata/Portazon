import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import Banner from './banner.jsx';

class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let changeView = this.props.changeView;
    return(
      <div>
        <Header changeView={changeView}></Header>
        <Banner/>
        <Footer></Footer>
      </div>
    );
  }
}

export default HomePage;