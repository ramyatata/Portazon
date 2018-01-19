import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

class HomePage extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <Header></Header>
        <div>HomePage main Content</div>
        <Footer></Footer>
      </div>
    );
  }
}

export default HomePage;