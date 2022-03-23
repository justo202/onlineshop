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

  render() {
    const { img, name, price, symbol, inStock, id, brand, gallery, prices, fetchProductinfo  } = this.props;
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
          <div style={{ marginTop: "auto" }}>
            <h5>
              {brand} {name}
            </h5>
            <p>
              {price} {symbol}
            </p>
          </div>
        </Link>
        {inStock && (
          <button
            className="add-to-cart-button"
            onClick={() => this.addProduct(brand, name, prices, gallery, id)}
          >
            <CartLogo className="cart-logo" fill="white" />
          </button>
        )}
      </div>
    );
  }
}

export default Product;
