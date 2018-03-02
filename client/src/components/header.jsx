  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Badge } from 'react-bootstrap';

  import CategoryList from './categoryList.jsx';

  var axios = require('axios');

  class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        query: '',
        searchedItems: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.changeView = this.changeView.bind(this);
      this.handleSearchClick = this.handleSearchClick.bind(this);
      this.handleLoginClick - this.handleLoginClick.bind(this);
      this.renderBadge = this.renderBadge.bind(this);
    }

    changeView(view){
      let changeView = this.props.changeView;
      changeView(view);
    }

    changeViewToProductList() {
      this.props.changeView('productslist');
    }


    populateCategoriesMenu(){

    }

    handleLoginClick() {
      let user = {
        email: document.getElementById('email').value,
        pw: document.getElementById('pw').value
      }
      this.props.login(user);
    }

    handleLogoutClick() {
      this.props.logout();
    }

    handleSearchClick() {
      let submitQuery = this.props.submitQuery;
      submitQuery(this.state.query);
    }

    handleChange(e) {
      this.setState({query: e.target.value});
    }

    renderBadge() {
      let num = this.props.badge;
      if (num === 0) {
        return null;
      } else {
        return (
          <p><Badge className="badge" style={{'backgroundColor': '#2BABBC', 'padding': '2px 5px 2px 5px', 'top': '0', 'position':'absolute'}}>{num}</Badge></p>
        )
      }
    }

    renderLoginOptions() {
      let user = this.props.user;
      if (user.firstname === 'Guest') {
        return (
          <li className="dropdown">
           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" style={{'fontSize': '1.5em','paddingTop': '5px', 'paddingRight':'5px', 'display':'inline-block'}}></span></a>
           <div className="dropdown-menu">
             <div className="header-account-dropdown">
                <h3 style={{color: '#fff'}}>Login</h3>
             </div>
             <form method="post" action="/account/login" className='header-account-dropdown'>
               <div className="form-group ">
                 <input type="email" id="email" className="form-control" placeholder="Email"/>
               </div>
               <div className="form-group">
                 <input type="password" id="pw" className="form-control" placeholder="Password"/>
               </div>
               <button type="button" className="btn btn-block" onClick={() => this.handleLoginClick()}>SIGN IN</button>
             </form>
             <div className="header-account-dropdown">
               <a onClick={() =>this.changeView('registerUserForm')}>Create Account</a>
               <a href="#">Forgot Password?</a>
             </div>
           </div>
         </li>
        )
      } else {
        return (
          <li className="dropdown">
           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" style={{'fontSize': '1.5em', 'paddingTop': '5px', 'paddingRight':'5px'}}></span></a>
           <div className="dropdown-menu">
             <div className="header-account-dropdown">
                <h3 style={{color: '#fff'}}>Log Out</h3>
             </div>
             <a onClick={() => this.changeView('userProfile')}>your profile</a>
             <button type="button" onClick={() => {this.handleLogoutClick()}}className="btn btn-block">Log Out!</button>
           </div>
          </li>
        )
      }
    }

    render() {
      return (
        <div className="container-fluid">
        <nav className="navbar navbar-inverse">
          <div className="">

            {/* Logo */}
            <div className="navbar-header logo">
              <a className="navbar-brand" href="#">PORTAZON</a>
            </div>

            {/* category menu */}
            <ul className="nav navbar-nav">
              <li className='dropdown'>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop By <span className="caret"></span></a>
                  <CategoryList getCategoryItems={this.props.getCategoryItems}></CategoryList>
              </li>
            </ul>

          {/* search bar */}
            <ul className="nav navbar-nav" style={{width: '50%'}}>
              <div className="input-group" style={{paddingTop: '10px'}}>
                <input onChange={e => this.handleChange(e)} type = "text" className ="form-control" placeholder="Search for something fun ..." />
                <div onClick={this.handleSearchClick} className="input-group-addon">
                  <span className="glyphicon glyphicon-search"></span>
                </div>
              </div>
            </ul>

           {/* user account */}
          <ul className="nav navbar-nav navbar-right">
            <li style={{'color': 'white', 'paddingRight': '10px', 'paddingTop': '25px'}}>
              <span >Hello, {this.props.user.firstname}!</span>
            </li>
            {this.renderLoginOptions()}
            <li style={{'paddingRight': '20px'}}>
              <span onClick={() => this.changeView('shoppingCart')} style={{marginTop: '20px', color:'grey', textAlign:'center', border:'none', 'fontSize': '1.6em', 'paddingRight': '10px', 'cursor': 'pointer'}} className="glyphicon glyphicon-shopping-cart">
              </span>
            </li>
          </ul>
          </div>
        </nav>
        </div>
      );
    }
  }

export default Header;

{/*
<li>
  <button onClick={() => this.changeView('shoppingCart')} style={{marginTop: '15px', backgroundColor: '#222', color:'grey', textAlign:'center', border:'none'}}>
    <span className="glyphicon glyphicon-shopping-cart" style={{'fontSize': '1.5em'}}>
    {this.renderBadge()}
    </span>
  </button>
</li>
*/}
