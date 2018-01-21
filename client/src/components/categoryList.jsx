import React from 'react';
import ReactDOM from 'react-dom';

class CategoryList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'categories': ['Jewellery','Mobiles & Accessories','Clothing','Bags',
                      'Wallets & Belts','Health & Personal Care Appliances',
                      'Beauty and Personal Care','Footwear','Baby Care',
                      'Home Furnishing','Computers','Sports & Fitness',
                      'Cameras & Accessories','Home Improvement',
                      'Household Supplies','Pens & Stationery',
                      'Home Decor & Festive Need','Furniture','Kitchen & Dining',
                      'Toys & School Supplies','Eyewear','Automotive',
                      'Home Entertainment','Tools & Hardware','Pet Supplies',
                      'eBooks','Gaming','Watches','Sunglasses','Home & Kitchen']
    }
  }
  render() {
    const list = this.state.categories.map((item, ind)=>{return <li key={ind}>{item}</li>});

    return (
      <ul className='dropdown-menu header-category-dropdown'>
      {list}
      </ul>
    );
  }
}

export default CategoryList;
