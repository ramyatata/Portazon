import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductCard from './productCard.jsx';

// class ProductsListPage extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       products: this.props.products
//     }
//     this.createProductCards = this.createProductCards.bind(this);
//   }

//   createProductCards() {
//     let products = this.state.products;
//     let addItemToCart = this.props.addItemToCart;
//     return products.map((item, ind) => (
//         <ProductCard item={item} key={ind} addItemToCart={addItemToCart}/>
//       )
//     )
//   }


//   render(){
//     console.log('itemsin product list', this.state.products)
//     return(
//         <div>
//           {/*<Header submitQuery={this.props.submitQuery}></Header>*/}
//           <h3>You searched for: {this.props.query}</h3>
//           <div className="col-xs-12">
//             {this.createProductCards()}
//           </div>
//           <Footer/>
//         </div>
//       );
//   }
// }
const ProductsListPage = ({products, query, addItemToCart}) => (
          <div>
           <h3>You searched for: {query}</h3>
           <div className="col-xs-12">
            {products.map((item, ind) => (
                <ProductCard item={item} key={ind} addItemToCart={addItemToCart}/>
              )
            )}
           </div>
           <Footer/>
        </div>

);

function createProductCards(products) {

  return products.map((item, ind) => (
      <ProductCard item={item} key={ind} addItemToCart={addItemToCart}/>
    )
  )
}

export default ProductsListPage;