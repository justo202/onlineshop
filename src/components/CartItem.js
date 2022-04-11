import React, { Component } from "react";
class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: 0,
      galleryLength: this.props.data.gallery.length,
    };
  }
  renderProductPrice(prices) {
    const cur = this.props.currency;
    const price = this.props.getProductPrice(prices, cur.label);

    return (
      <h4>
        {cur.symbol}
        {price.amount}
      </h4>
    );
  }
  renderProductSelectedAttributes(attributes) {
    const mapped = Object.keys(attributes).map((key, index) => {
      return (
        <div key={key} className="attribute-display">
          <h6>{key}</h6>
          <button
            style={{
              backgroundColor:
                attributes[key][1] === "swatch" ? `${attributes[key][0]}` : "",
            }}
            key={index}
            className="atrribute-select"
          >
            {attributes[key][1] === "text" && attributes[key][0]}
          </button>
        </div>
      );
    });
    return <div className="product-atributes-cart">{mapped}</div>;
  }
  renderProductSelectedAttributesDropdown(attributes) {
    const mapped = Object.keys(attributes).map((key, index) => {
      const attribute = attributes[key];
      return (
        <li key={index}>
          {key}:{" "}
          <span
            style={{
              color:
                attribute[1] === "swatch" && attribute[0] !== "White"
                  ? attribute[2]
                  : "",
            }}
            className="attribute"
          >
            {attribute[0]}
          </span>
        </li>
      );
    });

    return <ul className="attribute-dropdown-list">{mapped}</ul>;
  }

  renderQuantity(quantity, itemInfo) {
    return (
      <div className="qty-cart">
        <button
          onClick={(e) => {
            e.stopPropagation();
            this.props.incrementCartItem(itemInfo);
          }}
        >
          +
        </button>
        <h5>{quantity}</h5>
        <button
          onClick={(e) => {
            e.stopPropagation();
            this.props.decrementCartItem({ quantity, ...itemInfo });
          }}
        >
          -
        </button>
      </div>
    );
  }
  renderImage(name, gallery) {
    return (
      <div className="cart-image-container">
        {this.state.galleryLength > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.previousImage();
              }}
              className="left"
            >
              <p>{"<"}</p>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.nextImage();
              }}
              className="right"
            >
              <p>{">"}</p>
            </button>
          </>
        )}

        <img
          width={"100%"}
          height={"100%"}
          alt={name}
          src={gallery[this.state.displayImage]}
        />
      </div>
    );
  }
  nextImage() {
    const { displayImage, galleryLength } = this.state;
    this.setState({
      displayImage:
        displayImage + 1 < galleryLength ? displayImage + 1 : displayImage,
    });
  }
  previousImage() {
    const { displayImage } = this.state;
    this.setState({
      displayImage: displayImage - 1 > -1 ? displayImage - 1 : displayImage,
    });
  }
  render() {
    const { name, brand, prices, attributes, gallery, id, quantity } =
      this.props.data;
    const { isDropDown = false } = this.props;
    return (
      <div className="cart-item-container">
        <div className="cart-item-info">
          <div className="title">
            <h2>{brand}</h2>
            <h3>{name}</h3>
          </div>
          {this.renderProductPrice(prices)}
          {isDropDown
            ? this.renderProductSelectedAttributesDropdown(attributes)
            : this.renderProductSelectedAttributes(attributes)}
        </div>
        <div
        className="cart-image-quantity"
        >
          {this.renderQuantity(quantity, { attributes, id, prices })}
          {this.renderImage(name, gallery)}
        </div>
      </div>
    );
  }
}

export default CartItem;
