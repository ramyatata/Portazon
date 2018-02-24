import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class CategoryList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // 'categories': ['Jewellery','Mobiles & Accessories','Clothing','Bags',
      //                 'Wallets & Belts','Health & Personal Care Appliances',
      //                 'Beauty and Personal Care','Footwear','Baby Care',
      //                 'Home Furnishing','Computers','Sports & Fitness',
      //                 'Cameras & Accessories','Home Improvement',
      //                 'Household Supplies','Pens & Stationery',
      //                 'Home Decor & Festive Need','Furniture','Kitchen & Dining',
      //                 'Toys & School Supplies','Eyewear','Automotive',
      //                 'Home Entertainment','Tools & Hardware','Pet Supplies',
      //                 'eBooks','Gaming','Watches','Sunglasses','Home & Kitchen']
      categories: ['Electronics', 'Baby', 'Clothing','Footwear', 'Stationery', 'kitchen' ]
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(evt){
    let category = evt.target.innerHTML;
    this.props.getCategoryItems(category);
  }

  render() {
    const list = this.state.categories.map((item, ind)=>{return <li key={ind} name={item} value={item} onClick={(evt)=>{this.clickHandler(evt)}} style={{backgroundColor: '#333', color: '#fff', padding: '1px 10px', cursor:'pointer'}}>{item}</li>});

    return (
      <ul className='dropdown-menu header-category-dropdown' style={{backgroundColor: '#333'}}>
      {list}
      </ul>
    );
  }
}

export default CategoryList;
