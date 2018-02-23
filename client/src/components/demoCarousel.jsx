import React from 'react';

// class card extends from React.Component {
//   constructor() {

//   }

//   render() {

//   }
// }

class DemoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items = [
        {title: one},
        {title: two},
        {title: three},
        {title: four},
        {title: five},
        {title: six},
        {title: seven},
        {title: eight},
        {title: nine},
        {title: ten}
      ],
      activeItems = [],
      startIndex: 0
    };
  }

  render() {
    return (
      <ul>
        <li> <div className="col-xs-4">1</div></li>
        <li> <div className="col-xs-4">2</div></li>
        <li> <div className="col-xs-4">3</div></li>
      <ul>
    );
  }
}

//export default FeaturedProducts;