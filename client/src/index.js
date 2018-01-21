import React from 'react'
import ReactDOM from 'react-dom'


import ShoppingCart from './components/Shoppingcart.jsx';
import HomePage from './components/homePage.jsx'



class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'homepage',
      cart: products
    }
    console.log('cart', this.state.cart)
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount(){
    this.parseImages();

  }

  changeView(view){
    this.setState({view: view});
  }

  parseImages() {
    let cart = this.state.cart;
    let newCart = parseImageUrls(cart);
    this.setState({cart: newCart});
  }

  getProductsByQuery(query) {
    //lets use axios instead of ajax
    $.ajax({
      method: 'get',
      url: '/search/:query',
      success: (response) => {
        console.log('success in get request by query string!', response)
      },
      error: (err) => {
        console.log('err getting data', err);
      }
    })
  }

  addItemToCart(item) {
    //this function should have an input of an object that represents a single item
    //we then need to do an ajax POST request to the server to addItemToCart
    //the data we need to send with this request is the item object
    //upon success:
    //we should update the users shopping cart by setting the state
    //upon error:
    //console log the error and see whats happening!

    //for now:
    this.state.cart.push(item);
  }

  removeItemFromCart(item) {
    //this function should have an input of an item object
    //we then need to do an ajax POST request to the server to removeItemFromCart
    //the data we need to send with this post request is the item object
    //upon success:
    //we should update the users cart to reflect the removed item
    //upon error:
    //console log the error and see whats happening!!

    //for now:
    let cart = this.state.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] === item) {
        cart.splice(i, 1);
        return;
      }
    }
    return;
  }

  renderView() {

    let view = this.state.view;
    if (view === 'homepage') {
      return <HomePage changeView={this.changeView}/>
    } else if (view === 'shoppingCart') {
      // console.log('cart in index', this.state.cart)
      return <ShoppingCart cart={this.state.cart}/>
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>

        <div>
          {this.renderView()}
        </div>
      </div>
      );
  }
}

function parseImageUrls(items) {
  for (let i = 0; i < items.length; i++) {
    let images = JSON.parse(items[i]._source.image);
    items[i]._source.image = images;
  }
  return items;
}

var products = [
      {
        "_index": "products",
        "_type": "inventory",
        "_id": "z8AAEmEBRB0XaN4mJXeY",
        "_score": 11.070465,
        "_source": {
            "brand": null,
            "host": "Lichins-MacBook-Pro.local",
            "product_category_tree": "[\"Toys & School Supplies\", \"Soft Toys\", \"Smiledrive Soft Toys\"]",
            "@version": "1",
            "image": "[\"http://img6a.flixcart.com/image/stuffed-toy/h/a/m/smiledrive-25-snuggle-arm-shaped-stuffed-pillow-toy-original-imadtjhsrpgqgzzk.jpeg\"]",
            "discounted_price": 899,
            "uniq_id": "7d72519963bd44cb3d547da16da16039",
            "product_url": "http://www.flipkart.com/smiledrive-snuggle-arm-shaped-stuffed-pillow-toy-25-inch/p/itmdtgqzbzphfh8k?pid=STFDTGQZGEVP2HAM",
            "retail_price": 1499,
            "message": "7d72519963bd44cb3d547da16da16039,http://www.flipkart.com/smiledrive-snuggle-arm-shaped-stuffed-pillow-toy-25-inch/p/itmdtgqzbzphfh8k?pid=STFDTGQZGEVP2HAM,Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch,\"[\"\"Toys & School Supplies\"\", \"\"Soft Toys\"\", \"\"Smiledrive Soft Toys\"\"]\",1499,899,\"[\"\"http://img6a.flixcart.com/image/stuffed-toy/h/a/m/smiledrive-25-snuggle-arm-shaped-stuffed-pillow-toy-original-imadtjhsrpgqgzzk.jpeg\"\"]\",Buy Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch Snuggle Arm Shaped Stuffed Pillow Toy from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Cushions & Pillows toys online in India Toys for Boys. Toys for Girls.,5,\r",
            "@timestamp": "2018-01-20T05:17:33.343Z",
            "path": "/Users/lichinshao/desktop/hr-remote/Portazon/server/data/product_list.csv",
            "product_name": "Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch",
            "rating": 5,
            "description": "Buy Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch Snuggle Arm Shaped Stuffed Pillow Toy from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Cushions & Pillows toys online in India Toys for Boys. Toys for Girls."
        },
        "quantity": 2
    },
     {
        "_index": "products",
        "_type": "inventory",
        "_id": "VoJKB2EBdMHpsLZF5Onf",
        "_score": 10.16357,
        "_source": {
            "@timestamp": "2018-01-18T03:23:23.526Z",
            "product_name": "Gungun Toys Beautiful Teddy Bear  - 152 cm",
            "rating": null,
            "retail_price": 1999,
            "description": "Buy Gungun Toys Beautiful Teddy Bear  - 152 cm Beautiful Teddy Bear from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Teddy Bears toys online in India",
            "image": "[\"http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg\", \"http://img5a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-original-imae9ehhfkgfybce.jpeg\"]",
            "brand": null,
            "host": "Lichins-MacBook-Pro.local",
            "discounted_price": 1600,
            "message": "8f06175a03f746c17bbcd315231a4c24,http://www.flipkart.com/gungun-toys-beautiful-teddy-bear-152-cm/p/itme9eq8jxxvxgbg?pid=STFE9EQ8MZRNQMJF,Gungun Toys Beautiful Teddy Bear  - 152 cm,\"[\"\"Toys & School Supplies\"\", \"\"Soft Toys\"\", \"\"Gungun Toys Soft Toys\"\"]\",1999,1600,\"[\"\"http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg\"\", \"\"http://img5a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-original-imae9ehhfkgfybce.jpeg\"\"]\",Buy Gungun Toys Beautiful Teddy Bear  - 152 cm Beautiful Teddy Bear from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Teddy Bears toys online in India,,\r",
            "product_category_tree": "[\"Toys & School Supplies\", \"Soft Toys\", \"Gungun Toys Soft Toys\"]",
            "uniq_id": "8f06175a03f746c17bbcd315231a4c24",
            "@version": "1",
            "product_url": "http://www.flipkart.com/gungun-toys-beautiful-teddy-bear-152-cm/p/itme9eq8jxxvxgbg?pid=STFE9EQ8MZRNQMJF",
            "path": "/Users/lichinshao/desktop/hr-remote/Portazon/server/data/product_list.csv"
        },
        "quantity": 1
    }
]
ReactDOM.render(<Hello/>, document.getElementById('root'));


