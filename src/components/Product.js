import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CartLogo } from '../svg/cart.svg';
class Product extends Component {

  addProduct(brand,name,prices,gallery,id) {
    const product = {
      attributes: { },
      brand,
      name,
      prices,
      gallery,
      id,
      quantity: 1,
    };
    this.props.addToCart(product)
    alert('Product added to cart!')
  }

  render() {
    const { img, name, price, symbol, inStock, id, brand, gallery, prices } = this.props;
    return (
      <div className={`productContainer ${inStock ? "" : "soldOut"}`} >

      
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/product/${id}`}
        
      >
        <div
          style={{ display: `${inStock ? "none" : "block"}` }}
          className="center"
        >
          <h3>OUT OF STOCK</h3>
        </div>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxHeight: "250px",
            marginBlockEnd: "10px",
          }}
          src={img}
          alt={name}
        />
        <h5>{brand} {name}</h5>
        <p>
          {price} {symbol}
        </p>

      </Link>
      {(inStock && 
      
      <button className="add-to-cart-button" onClick={() => this.addProduct(brand,name, prices,gallery, id)}><CartLogo className="cart-logo" fill="white"/></button>
      )
      }
      
    </div>
    );
  }
}

export default Product;
