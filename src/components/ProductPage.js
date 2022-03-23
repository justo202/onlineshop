import React, { Component } from "react";
import parse from 'html-react-parser';
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productLoading: true,
      productInfo: [],
      selectedAttributes: null,
      currency: this.props.currency,
      displayImage: "",
    };
  }
  // updates state when props change
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.currency !== props.currency) {
      return {
        currency: props.currency,
      };
    }
    if(current_state.productInfo !== props.data.productInfo.productInfo) {
      return {
        productInfo: props.data.productInfo.productInfo,
        selectedAttributes: props.data.productInfo.selectedAttributes,
        displayImage: props.data.productInfo.displayImage,
        productLoading: props.data.isLoading
      }
    }
    if(current_state.productLoading !== props.data.isLoading) {
      return {
        productLoading: props.data.isLoading
      }
    }
    return null;
  }
  setSelectedAttribute(attributeId, displayValue, type, value) {
    var copy = this.state.selectedAttributes;
    copy[attributeId] = [displayValue, type, value];
    this.setState({
      selectedAttributes: copy,
    });
  }
  //Renders the attribute section of the product
  renderAttributes(attributes) {
    const overlay = attributes.map((attribute) => (
      <div key={attribute.id}>
        <h4 style={{ fontWeight: "bolder" }}>
          {attribute.name}:{" "}
          <span style={{ fontStyle: "italic" }}>
            {this.state.selectedAttributes[attribute.id][0]}
          </span>
        </h4>
        <div className="grid">
          {attribute.items.map((item) => (
            <button
              onClick={() =>
                this.setSelectedAttribute(
                  attribute.id,
                  item.displayValue,
                  attribute.type,
                  item.value
                )
              }
              style={{
                backgroundColor:
                  attribute.type === "swatch" ? `${item.value}` : "",
              }}
              key={item.id}
              className="atrribute-select"
            >
              {attribute.type === "text" && item.displayValue}
            </button>
          ))}
        </div>
      </div>
    ));

    return overlay;
  }
  renderProductPrice(prices) {
    const cur = this.props.currency;
    const price = this.props.getProductPrice(prices, cur.label);

    return (
      <h4 id="price-number">
        {cur.symbol}
        {price.amount}
      </h4>
    );
  }

  changeDisplayImage(imgURL) {
    this.setState({
      displayImage: imgURL,
    });
  }

  addToCart(attributes, { brand, name, prices, gallery }, id) {
    if (Object.values(attributes).includes("")) {
      alert("Please select all attributes");
    } else {
      //create a copy of the attribues and not reference them directly SINCE OBJCETS ARE PASSED AS REFERENCES AND NOT ACTUAL OBJECTS 
      const product = {
        attributes: { ...attributes },
        brand,
        name,
        prices,
        gallery,
        id,
        quantity: 1,
      };
      this.props.addToCart(product);
      alert("Product added!");
    }
  }
  render() {
    if (!this.state.productLoading) {
      const { gallery, brand, name, attributes, description, prices, inStock } =
        this.state.productInfo;
      return (
        <div className="grid">
          <div className="product-image-grid">
            {gallery.map((image, index) => (
              <img
                onMouseOver={() => this.changeDisplayImage(image)}
                onTouchStart={() => this.changeDisplayImage(image)}
                key={index}
                width={"100%"}
                alt="smaller product"
                src={image}
              />
            ))}
          </div>
          <div className="large-image-container">
            <img
              width={"100%"}
              alt="main display"
              src={this.state.displayImage}
            />
          </div>
          <div className="item-info-grid">
            <div className="title">
              <h2>{brand}</h2>
              <h3>{name}</h3>
            </div>
            {this.renderAttributes(attributes)}
            <div className="product-price-container">
              <h4>
                Price
              </h4>
              {this.renderProductPrice(prices)}
            </div>
            <button
            className="product-page-button"
              style={{
                opacity: inStock ? 1 : 0.6,
                cursor: inStock ? "pointer" : "auto",
              }}
              onClick={
                inStock ? () =>  this.addToCart(this.state.selectedAttributes, this.state.productInfo, this.state.productInfo.id) : undefined
              }
            >
              {inStock ? "Add to cart" : "Item out of stock"}
            </button>
            {parse(description)}
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default ProductPage;
