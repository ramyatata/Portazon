import React from 'react';
import Footer from './Footer.jsx';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      totalAmt: 0,
      totalItems: 0
    }
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  // componentWillMount() {
  //   this.parseImages();
  // }

  componentDidMount(){
    this.getTotals();
  }

  // parseImages() {
  //   let cart = this.state.cart;
  //   let newCart = parseImageUrls(cart);
  //   this.setState({cart: newCart});
  // }

  changeQuantity(e, item) {
    let cart = this.state.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === item._id) {
        cart[i].quantity = Number(e.target.value);
      }
    }
    this.setState({cart: cart});
    this.getTotals();
  }

  getTotals(){
    let items = this.state.cart;
    let totalPrice = 0;
    let totalItems = 0;
    for (let i = 0; i < items.length; i++) {
      let retail = items[i]._source.retail_price;
      let sale = items[i]._source.discounted_price;
      let quantity = items[i].quantity;
      let itemTotal = 0;
      let indTotal = 0;
      if (!sale) {
        itemTotal = quantity * retail;
      } else {
        itemTotal = quantity * sale;
      }
      items[i].indTotal = itemTotal;
      totalPrice += itemTotal;
      totalItems = totalItems + quantity;
    }
    this.setState({totalAmt: totalPrice.toFixed(2), totalItems: totalItems});
  }

  createItemList() {
    let items = this.state.cart;
    return items.map((item, ind) => (
      <div className="cart-item-list col-sm-12" key={ind}>
        <img src={item._source.image[0]} alt="" className="cart-item-img col-sm-3"></img>
        <div className="col-sm-3">{item._source.product_name}</div>
        <div className="col-sm-2">{item._source.discounted_price}</div>
        <input onChange={e => this.changeQuantity(e, item)} className="col-sm-2" placeholder={item.quantity}/>
        <div className="col-sm-2">{item.indTotal}</div>
      </div>
    ))

  }

  render() {
    return(
      <div className="container-fluid">
        <div>
          <h2>shopping cart</h2>
        </div>
        <div>
          <h3>Your current total amount is: $ {this.state.totalAmt}</h3>
        </div>
        <div className="cart-item-banner col-sm-12">
          <div className="col-sm-3">picture</div>
          <div className="col-sm-3">name</div>
          <div className="col-sm-2">price</div>
          <div className="col-sm-2">quantity</div>
          <div className="col-sm-2">total</div>
        </div>
        <div className="cart-items col-sm-12">
          {this.createItemList()}
        </div>
        <div className="cart-summary col-sm-12">
          <div className="col-sm-7">
          </div>
          <div className="col-sm-5">
            <div>
              <input placeholder="enter promo code here"/>
              <button>Apply</button>
            </div>
            <div>
              Subtotal ({this.state.totalItems} items): ${this.state.totalAmt}
            </div>
            <div>
              Shipping & Handling: $0.00
            </div>
            <div>
              Estimated Taxes: $0.00 **
            </div>
            <div>
              Estimated Order Total: ${this.state.totalAmt}
            </div>
            <div>
              ** Actual sales tax will be calculated at time of shipment
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;

// function parseImageUrls(items) {
//   for (let i = 0; i < items.length; i++) {
//     let images = JSON.parse(items[i]._source.image);
//     items[i]._source.image = images;
//   }
//   return items;
// }

// var products = [
//       {
//         "_index": "products",
//         "_type": "inventory",
//         "_id": "z8AAEmEBRB0XaN4mJXeY",
//         "_score": 11.070465,
//         "_source": {
//             "brand": null,
//             "host": "Lichins-MacBook-Pro.local",
//             "product_category_tree": "[\"Toys & School Supplies\", \"Soft Toys\", \"Smiledrive Soft Toys\"]",
//             "@version": "1",
//             "image": "[\"http://img6a.flixcart.com/image/stuffed-toy/h/a/m/smiledrive-25-snuggle-arm-shaped-stuffed-pillow-toy-original-imadtjhsrpgqgzzk.jpeg\"]",
//             "discounted_price": 899,
//             "uniq_id": "7d72519963bd44cb3d547da16da16039",
//             "product_url": "http://www.flipkart.com/smiledrive-snuggle-arm-shaped-stuffed-pillow-toy-25-inch/p/itmdtgqzbzphfh8k?pid=STFDTGQZGEVP2HAM",
//             "retail_price": 1499,
//             "message": "7d72519963bd44cb3d547da16da16039,http://www.flipkart.com/smiledrive-snuggle-arm-shaped-stuffed-pillow-toy-25-inch/p/itmdtgqzbzphfh8k?pid=STFDTGQZGEVP2HAM,Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch,\"[\"\"Toys & School Supplies\"\", \"\"Soft Toys\"\", \"\"Smiledrive Soft Toys\"\"]\",1499,899,\"[\"\"http://img6a.flixcart.com/image/stuffed-toy/h/a/m/smiledrive-25-snuggle-arm-shaped-stuffed-pillow-toy-original-imadtjhsrpgqgzzk.jpeg\"\"]\",Buy Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch Snuggle Arm Shaped Stuffed Pillow Toy from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Cushions & Pillows toys online in India Toys for Boys. Toys for Girls.,5,\r",
//             "@timestamp": "2018-01-20T05:17:33.343Z",
//             "path": "/Users/lichinshao/desktop/hr-remote/Portazon/server/data/product_list.csv",
//             "product_name": "Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch",
//             "rating": 5,
//             "description": "Buy Smiledrive Snuggle Arm Shaped Stuffed Pillow Toy  - 25 inch Snuggle Arm Shaped Stuffed Pillow Toy from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Cushions & Pillows toys online in India Toys for Boys. Toys for Girls."
//         },
//         "quantity": 2
//     },
//      {
//         "_index": "products",
//         "_type": "inventory",
//         "_id": "VoJKB2EBdMHpsLZF5Onf",
//         "_score": 10.16357,
//         "_source": {
//             "@timestamp": "2018-01-18T03:23:23.526Z",
//             "product_name": "Gungun Toys Beautiful Teddy Bear  - 152 cm",
//             "rating": null,
//             "retail_price": 1999,
//             "description": "Buy Gungun Toys Beautiful Teddy Bear  - 152 cm Beautiful Teddy Bear from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Teddy Bears toys online in India",
//             "image": "[\"http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg\", \"http://img5a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-original-imae9ehhfkgfybce.jpeg\"]",
//             "brand": null,
//             "host": "Lichins-MacBook-Pro.local",
//             "discounted_price": 1600,
//             "message": "8f06175a03f746c17bbcd315231a4c24,http://www.flipkart.com/gungun-toys-beautiful-teddy-bear-152-cm/p/itme9eq8jxxvxgbg?pid=STFE9EQ8MZRNQMJF,Gungun Toys Beautiful Teddy Bear  - 152 cm,\"[\"\"Toys & School Supplies\"\", \"\"Soft Toys\"\", \"\"Gungun Toys Soft Toys\"\"]\",1999,1600,\"[\"\"http://img6a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-1100x1100-imae9ehhfkgfybce.jpeg\"\", \"\"http://img5a.flixcart.com/image/stuffed-toy/9/k/4/gungun-toys-111-beautiful-teddy-bear-original-imae9ehhfkgfybce.jpeg\"\"]\",Buy Gungun Toys Beautiful Teddy Bear  - 152 cm Beautiful Teddy Bear from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery! Buy Teddy Bears toys online in India,,\r",
//             "product_category_tree": "[\"Toys & School Supplies\", \"Soft Toys\", \"Gungun Toys Soft Toys\"]",
//             "uniq_id": "8f06175a03f746c17bbcd315231a4c24",
//             "@version": "1",
//             "product_url": "http://www.flipkart.com/gungun-toys-beautiful-teddy-bear-152-cm/p/itme9eq8jxxvxgbg?pid=STFE9EQ8MZRNQMJF",
//             "path": "/Users/lichinshao/desktop/hr-remote/Portazon/server/data/product_list.csv"
//         },
//         "quantity": 1
//     }
// ]