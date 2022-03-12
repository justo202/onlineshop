import React, { Component } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProductPage from "./ProductPage";
import { fetchProducts, selectCategory, fetchNavbarInfo, selectCurrency, addToCart, incrementCartItem, decrementCartItem } from "../redux/ActionCreator";
import CartPage from "./cartPage";
import { Link } from "react-router-dom";



const mapStateToProps = state => {
  return {
    products: state.products,
    category: state.category,
    currency: state.currency,
    cart: state.cart,
    total: state.total
  };
};
const mapDispatchToProps = (dispatch) => ({
 
  fetchProducts: (client, selectedCategory) => dispatch(fetchProducts(client, selectedCategory)),
  updateCategory: (category) => dispatch(selectCategory(category)),
  fetchNavbarInfo: (client) => dispatch(fetchNavbarInfo(client)),
  selectCurrency: (currency) => dispatch(selectCurrency(currency)),
  addToCart: (product) => dispatch(addToCart(product)),
  incrementCartItem: (product) => dispatch(incrementCartItem(product)),
  decrementCartItem: (product) => dispatch(decrementCartItem(product)),

});
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDarkBackground: false,

    };
  }

  setCurrency = (cur) => {
    this.props.selectCurrency(cur)
  };
  changeCategory = (category) => {
    const { fetchProducts, updateCategory } = this.props
    updateCategory(category)
    fetchProducts(this.props.client, category)
    
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
    this.props.fetchNavbarInfo(this.props.client);
    this.props.fetchProducts(this.props.client, this.props.category.selected);
   
  }

  renderProductGrid = (selectedCategory, productLoading, productMap) => {
    return (
      <>
        <div style={{ padding: "5px 20px" }}>
          <h2>{this.capitalizeName(selectedCategory)}</h2>
        </div>
        <div className="grid">
          {productLoading ? <h1>LOADING</h1> : productMap}
        </div>
      </>
    );
  };
  capitalizeName = (name) => {
    if(name == '') return
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  render() {

    const { products, currency, category, addToCart, cart, incrementCartItem, decrementCartItem, total } = this.props
  
    const {
      displayDarkBackground,
    } = this.state;

    var productMap = "Nothing loaded";
    if (!products.isLoading) {
      productMap = products.products.map((product) => {
        const curPrice = this.getProductPrice(product.prices, currency.selected.label);
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
            id="darkBackground"
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
            isLoading={currency.isLoading}
            currencies={currency.currency}
            categories={category.categories}
            currency={currency.selected}
            cart={cart}
            decrementCartItem={decrementCartItem} incrementCartItem={incrementCartItem}  getProductPrice={this.getProductPrice}
            total={total}
            capitalizeName={this.capitalizeName}
          />
  
          <div className="container">
            
            <Switch>
              <Route
                path="/product/:id"
                component={(props) => (
                  <ProductPage currency={currency.selected} getProductPrice={this.getProductPrice} addToCart={addToCart} client={this.props.client} {...props} />
                )}
              />
               <Route
              path="/cart"
              component={() => <CartPage decrementCartItem={decrementCartItem} incrementCartItem={incrementCartItem} currency={currency.selected} getProductPrice={this.getProductPrice} cart={cart}/>}
              />
              <Route
                path="/"
                component={() =>
                  this.renderProductGrid(
                    category.selected,
                    products.isLoading,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
