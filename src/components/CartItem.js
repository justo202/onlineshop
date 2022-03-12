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
    console.log(cur.label);
    const price = this.props.getProductPrice(prices, cur.label);

    return (
      <h4 style={{ margin: "10px 0", width: "100%", fontWeight: "bold" }}>
        {cur.symbol}
        {price.amount}
      </h4>
    );
  }
  renderProductSelectedAttributes(attributes) {
    const mapped = Object.keys(attributes).map((key, index) => {
      return (
        <button
          style={{
            backgroundColor:
              attributes[key][1] == "swatch" ? `${attributes[key][0]}` : "",
            width: "auto",
            minWidth: "50px",
            marginRight: "5px",
            padding: "5px",
          }}
          key={index}
          className="atrribute-select"
        >
          {attributes[key][1] == "text" && attributes[key][0]}
        </button>
      );
    });

    return mapped;
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
        <h5 style={{ textAlign: "center" }}>{quantity}</h5>
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
              style={{width: '10px', left: '5px'}}
            >
              <p>{"<"}</p>
            </button>
            <button
              style={{ width: '10px',right: "5px" }}
              onClick={(e) => {
                e.stopPropagation();
                this.nextImage();
              }}
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
    console.log(displayImage);
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
    return (
      <div className="cart-item-container">
        <div className="cart-item-info">
          <div className="title">
            <h2>{brand}</h2>
            <h3 style={{ fontWeight: "normal" }}>{name}</h3>
          </div>
          {this.renderProductPrice(prices)}
          <div className="product-atributes-cart">
            {this.renderProductSelectedAttributes(attributes)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "250px",
            justifyContent: "space-between",
          }}
        >
          {this.renderQuantity(quantity, { attributes, id, prices })}
          {this.renderImage(name, gallery)}
        </div>
      </div>
    );
  }
}

export default CartItem;
