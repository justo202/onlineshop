import React, { Component } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import { PRODUCTS, CATEGORY_AND_CURENCY_NAMES } from "../database/queries";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductPage from "./ProductPage";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productLoading: true,
      navbarLoading: true,
      displayDarkBackground: false,
      selectedCategory: "all",
      categories: [],
      currencies: [],
      currency: {
        __typename: "Currency",
        label: "USD",
        symbol: "$",
      },
      products: [],
    };
  }
  getSelectedProducts = (selectedCategory) => {
    this.props.client
      .query({
        query: PRODUCTS(selectedCategory),
      })
      .then((result) => {
        this.setState({
          productLoading: result.loading,
          products: result.data.category.products,
        });
      });
  };

  getAllCurencyAndCategory = () => {
    this.props.client
      .query({
        query: CATEGORY_AND_CURENCY_NAMES,
      })
      .then((result) => {
        this.setState({
          navbarLoading: result.loading,
          categories: result.data.categories,
          currencies: result.data.currencies,
          currency: result.data.currencies[0],
        });
      });
  };

  setCurrency = (cur) => {
    this.setState({
      currency: cur,
    });
  };
  changeCategory = (category) => {
    this.getSelectedProducts(category);
    this.setState({
      selectedCategory: category,
    });
  };
  changeDisplayBackground = () => {
    this.setState({
      displayDarkBackground: !this.state.displayDarkBackground,
    });
  };
  getProductPrice = (prices, currency) => {

    return prices.find((productPrice) => {
      if (productPrice.currency.label === currency) return productPrice;
    });
  };

  componentDidMount() {
    this.getAllCurencyAndCategory();
    this.getSelectedProducts(this.state.selectedCategory);
  }

  renderProductGrid = (selectedCategory, productLoading, productMap) => {
    return (
      <>
        <div style={{ padding: "5px 20px" }}>
          <h2>{selectedCategory}</h2>
        </div>
        <div className="grid">
          {productLoading ? <h1>LOADING</h1> : productMap}
        </div>
      </>
    );
  };
  render() {
    const {
      selectedCategory,
      navbarLoading,
      productLoading,
      products,
      currency,
      currencies,
      categories,
      displayDarkBackground,
    } = this.state;

    var productMap = "Nothing loaded";
    if (!productLoading) {
      productMap = products.map((product) => {
        const curPrice = this.getProductPrice(product.prices, currency.label);
        return (
          <Product
            key={product.id}
            name={product.name}
            price={curPrice.amount}
            symbol={curPrice.currency.symbol}
            img={product.gallery[0]}
            inStock={product.inStock}
            id={product.id}
          />
        );
      });
    }
    return (
      <>
        <div
          style={{
            position: "fixed",
            display: `${displayDarkBackground ? "block" : "none"}`,
            width: "100%",
            backgroundColor: "black",
            height: "100%",
            opacity: 0.6,
            zIndex: 2,
          }}
        ></div>

        <Navbar
          changeCategory={this.changeCategory}
          changeDisplayBackground={this.changeDisplayBackground}
          setCurrency={this.setCurrency}
          isLoading={navbarLoading}
          currencies={currencies}
          categories={categories}
          currency={currency}
          client={this.props.client}
        />

        <div className="container">
          <Switch>
            <Route
              path="/product/:id"
              render={(props) => (
                <ProductPage currency={currency} getProductPrice={this.getProductPrice} client={this.props.client} {...props} />
              )}
            />
            <Route
              path="/"
              component={() =>
                this.renderProductGrid(
                  selectedCategory,
                  productLoading,
                  productMap
                )
              }
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default MainComponent;
