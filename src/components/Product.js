import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartLogo } from "../svg/cart.svg";
class Product extends Component {

  addProduct(brand, name, prices, gallery, id) {
    const product = {
      attributes: {},
      brand,
      name,
      prices,
      gallery,
      id,
      quantity: 1,
    };
    this.props.addToCart(product);
    alert("Product added to cart!");
  }

  renderCartButton = ({attributes, brand, name, prices, gallery, id, inStock}) => {
    if(inStock && attributes.length === 0) 
      return (
        <button
        className="add-to-cart-button"
        onClick={() => this.addProduct(brand, name, prices, gallery, id)}
      >
        <CartLogo className="cart-logo" fill="white" />
      </button>
      )
    if(inStock && attributes.length > 0) 
      return (
     <Link to={`/product/${id}`} className="add-to-cart-button">
     <CartLogo className="cart-logo" fill="white" />
     </Link>  
      )
  }
  render() {
    const { product, img, price, symbol, fetchProductinfo } = this.props;
    const {name, id, inStock, brand} = product

    return (
      <div onClick={() => fetchProductinfo(id)}className={`productContainer ${inStock ? "" : "soldOut"}`}>
        <Link to={`/product/${id}`}>
          <div
            style={{ display: `${inStock ? "none" : "block"}` }}
            className="center"
          >
            <h3>OUT OF STOCK</h3>
          </div>
          <div className="img-container">
            <img src={img} alt={name} />
          </div>
          <div className="product-price-name-container">
            <h5>
              {brand} {name}
            </h5>
            <p>
              {price} {symbol}
            </p>
          </div>
          
        </Link>
     {this.renderCartButton(product)}
      </div>
    );
  }
}

export default Product;
