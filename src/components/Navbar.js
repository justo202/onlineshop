import React, { Component } from "react";
import CurrencySelect from "./CurrencySelect";
import { Link } from "react-router-dom";
import CartDropDown from "./CartDropDown";

class Navbar extends Component {

  render() {
    const {
      changeCategory,
      isLoading,
      categories,
      currencies,
      currency,
      setCurrency,
      changeDisplayBackground,
      cart,
      capitalizeName,
    } = this.props;

    return (
      <div style={{ display: "block", zIndex: 999, position: "relative" }}>
        <div className="navbar">
          <div className="navigation">
            {isLoading ? (
              <h5>loading...</h5>
            ) : (
              categories.map((item, index) => (
                <Link
                  to={"/"}
                  key={index}
                  onClick={() => changeCategory(item.name)}
                >
                  {" "}
                  <p>{capitalizeName(item.name)}</p>
                </Link>
              ))
            )}
          </div>
          <img alt="logo" height={"30px"} src="/images/check.png" />
          <div style={{ display: "flex", direction: "row" }}>
            {isLoading ? (
              <h5>loading...</h5>
            ) : (
              <CurrencySelect
                changeDisplayBackground={changeDisplayBackground}
                setCurrency={setCurrency}
                currencies={currencies}
                selected={currency}
              />
            )}
            <CartDropDown
              total={this.props.total}
              decrementCartItem={this.props.decrementCartItem}
              incrementCartItem={this.props.incrementCartItem}
              currency={currency}
              getProductPrice={this.props.getProductPrice}
              cart={cart}
              changeDisplayBackground={changeDisplayBackground}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
