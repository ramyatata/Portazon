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
                <ul className='dropdown-menu'>
                  <li><a href='#'>Cat1</a></li>
                  <li><a href='#'>Cat2</a></li>
                  <li><a href='#'>Cat3</a></li>
                  <li><a href='#'>Cat4</a></li>
                  <li><a href='#'>Cat5</a></li>
                  <li><a href='#'>Cat6</a></li>
                </ul>
              </li>
            </ul>



            <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <span className="input-group-text" id="basic-addon2">@example.com</span>
  </div>
</div>





            {/* search form */}
            <form className="navbar-form navbar-left">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for something fun ...."/>

                <div className="input-group-append">
     <button type="submit" className="btn btn-default input-gr"><span className='glyphicon glyphicon-search'></span></button>
  </div>

              </div>

            </form>

            {/* navbar right */}
            <ul className="nav navbar-nav navbar-right">
        <li><a href="#"><span className="glyphicon-glyphicon-shopping-cart"></span></a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="glyphicon glyphicon-user"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>

          </div>
        </nav>
      );
    }
  }

export default Header