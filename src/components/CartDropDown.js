import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartPage from "./cartPage";

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
            className="currencyBtn"
            style={{ height: "100%" }}
          >
            <img
              style={{ height: "30px" }}
              src="./images/cart.svg"
              alt="cart"
            />
          </button>
          {isListOpen && (
            <div
              style={{ width: "400px", padding: "10px", right: "10px" }}
              type="list"
              className="dropDown"
            >
              <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
                <CartPage
                  decrementCartItem={this.props.decrementCartItem}
                  incrementCartItem={this.props.incrementCartItem}
                  getProductPrice={this.props.getProductPrice}
                  currency={this.props.currency}
                  cart={this.props.cart}
                />
              </div>
              <div
                style={{
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <h5>Total</h5>
                <h5>
                  {this.props.currency.symbol} {displayTotal.amount.toFixed(2)}
                </h5>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
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
