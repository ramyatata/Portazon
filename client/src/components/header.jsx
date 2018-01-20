  import React from 'react';
  import ReactDOM from 'react-dom';

  class Header extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
      return (
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>

            {/* Logo */}
            <div className='navbar-header' id='logo'>
              <a className='navbar-brand' href='#'>PORTAZON</a>
            </div>

            {/* category menu */}
            <ul className="nav navbar-nav">
              <li className='dropdown'>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop By <span className="caret"></span></a>
                <ul className='dropdown-menu header-category-dropdown'>
                  <li><a href='#'>Cat1</a></li>
                  <li><a href='#'>Cat2</a></li>
                  <li><a href='#'>Cat3</a></li>
                  <li><a href='#'>Cat4</a></li>
                  <li><a href='#'>Cat5</a></li>
                  <li><a href='#'>Cat6</a></li>
                </ul>
              </li>
            </ul>


          {/* search bar */}
             <ul className="nav navbar-nav" style={{width: '50%'}}>
               <div className="input-group" style={{paddingTop: '10px'}}>
                 <input type = "text" className ="form-control" placeholder="Search for something fun ..." />
                 <div className="input-group-addon">
                   <span className="glyphicon glyphicon-search"></span>
                 </div>
                </div>
             </ul>

           {/* user account */}
          <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-shopping-cart" style={{'fontSize': '1.5em'}}></span></a></li>
               <li className="dropdown">
                 <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" style={{'fontSize': '1.5em'}}></span></a>
                 <div className="dropdown-menu">
                   <div className="header-account-dropdown">
                      <h3 style={{color: '#fff'}}>Login</h3>
                   </div>
                   <form method="post" action="/account/login" className='header-account-dropdown'>
                     <div className="form-group ">
                       <input type="email" className="form-control"placeholder="Email"/>
                     </div>
                     <div className="form-group">
                       <input type="password" className="form-control" placeholder="Password"/>
                     </div>
                     <button type="submit" className="btn btn-block">SIGN IN</button>
                   </form>
                   <div className="header-account-dropdown">
                     <a href="#">Create Account</a>
                     <a href="#">Forgot Password?</a>
                   </div>
                 </div>
               </li>
             </ul>
          </div>
        </nav>
      );
    }
  }

export default Header