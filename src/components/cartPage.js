import React, { Component } from "react";
import CartItem from "./CartItem";

class CartPage extends Component {
  renderCartItems(cart) {
    return cart.map((item, index) => {
      return (
        <CartItem key={index} isDropDown={this.props.isDropDown} decrementCartItem={this.props.decrementCartItem} incrementCartItem={this.props.incrementCartItem} currency={this.props.currency} data={item} getProductPrice={this.props.getProductPrice}/>
      );
    });
  }
  render() {
    const { cart } = this.props;

    return (
      <>
        <div className="title">
          <h2>Cart</h2>
        </div>
        {cart.length ? this.renderCartItems(cart) : <h5>No items in cart</h5>}
      </>
    );
  }
}

export default CartPage;
