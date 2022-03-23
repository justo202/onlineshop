import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartPage from "./cartPage";
import { ReactComponent as CartLogo } from '../svg/cart.svg';

class CartDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
    };
  }

  openMenu = () => {
    this.props.changeDisplayBackground();
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  };

  closeMenu = () => {
    this.props.changeDisplayBackground();
    this.setState({
      isListOpen: false,
    });
  };

  componentDidUpdate() {
    const { isListOpen } = this.state;

    // Time out is set so that the drop down wouldn't instantly open and close on click
    setTimeout(() => {
      if (isListOpen) {
        window.addEventListener("click", this.closeMenu);
      } else {
        window.removeEventListener("click", this.closeMenu);
      }
    }, 0);
  }
  renderTotal = (total, cur) => {
    return total.filter((item) => item.label === cur.label)[0];
  };
  renderProductAmount(amount) {

    if(amount > 0)
    return (
      <div className="cart-product-amount">
        {amount}
      </div>
    )
    return
  }

  render() {
    const { isListOpen } = this.state;
    const displayTotal = this.renderTotal(
      this.props.total,
      this.props.currency
    );
    return (
      <>
        <div>
          <button
            type="button"
            onClick={!isListOpen ? () => this.openMenu() : undefined}
            className="currencyBtn cart-logo-container"
          >
            {this.renderProductAmount(this.props.cart.length)}
            <CartLogo
              className="cart-logo"
              alt="cart"
            />
            
          </button>
          {isListOpen && (
            <div
              type="list"
              className="drop-down-cart"
            >
              <div className="cart-items-dropdown-container">
                <CartPage
                  decrementCartItem={this.props.decrementCartItem}
                  incrementCartItem={this.props.incrementCartItem}
                  getProductPrice={this.props.getProductPrice}
                  currency={this.props.currency}
                  cart={this.props.cart}
                  isDropDown
                />
              </div>
              <div
                className="total-amount-container"
              >
                <h5>Total</h5>
                <h5>
                  {this.props.currency.symbol} {displayTotal.amount.toFixed(2)}
                </h5>
              </div>
              <div
                className="cart-button-container"
              >
                <Link to={"/cart"}>
                  <button className="view-bag-btn">VIEW BAG</button>
                </Link>
                <button
                  onClick={() => alert("Check out clicked!")}
                  className="check-out-btn"
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default CartDropDown;
