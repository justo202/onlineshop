import react, { Component } from "react";
import { PRODUCT } from "../database/queries";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      productLoading: true,
      productInfo: [],
      selectedAttributes: null,
      currency: this.props.currency,
      displayImage: ''
    };
  }
  getSelectedProduct = (productId) => {
    this.props.client
      .query({
        query: PRODUCT(productId),
      })
      .then((result) => {
        var attributeMap = {};
        result.data.product.attributes.forEach((element) => {
          attributeMap[element.id] = "";
        });
        this.setState({
          productLoading: result.loading,
          productInfo: result.data.product,
          selectedAttributes: attributeMap,
          displayImage: result.data.product.gallery[0]
        });
      });
  };
  componentDidMount() {
    this.getSelectedProduct(this.state.id);
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.currency !== props.currency) {
      return {
        currency: props.currency,
      }
    }
    return null
  }
  setSelectedAttribute(attributeId, value) {
    var copy = this.state.selectedAttributes;
    copy[attributeId] = value;
    this.setState({
      selectedAttributes: copy,
    });
  }
  renderAttributes(attributes) {
    const overlay = attributes.map((attribute) => (
      <div key={attribute.id}>
        <h4 style={{ fontWeight: "bolder" }}>
          {attribute.name}:{" "}
          <span style={{ fontStyle: "italic" }}>
            {this.state.selectedAttributes[attribute.id]}
          </span>
        </h4>
        <div className="grid">
          {attribute.items.map((item) => (
            <button
              onClick={() =>
                this.setSelectedAttribute(attribute.id, item.displayValue)
              }
              style={{
                backgroundColor:
                  attribute.type == "swatch" ? `${item.value}` : "",
              }}
              key={item.id}
              className="atrribute-select"
            >
              {attribute.type == "text" && item.displayValue}
            </button>
          ))}
        </div>
      </div>
    ));

    return overlay;
  }
  renderProductPrice(prices) {
   
    const cur = this.state.currency;
   const price = this.props.getProductPrice(prices, cur.label)
   console.log(price)

   return(

    <h4 style={{ marginTop: 0, fontWeight: "bold" }}>{cur.symbol}{price.amount}</h4>
   )
   
  }

  changeDisplayImage(imgURL) {
    this.setState({
      displayImage: imgURL
    })

  }
  render() {
    
    
  
    if (!this.state.productLoading) {
        const { gallery, brand, name, attributes, description, prices } = this.state.productInfo;
       
      return (
        <div className="grid">
          <div className="product-image-grid">
            {gallery.map((image, index) => (
              <img
                onMouseOver={() => this.changeDisplayImage(image)}
                onTouchStart={() => this.changeDisplayImage(image)}
                key={index}
                width={"100%"}
                style={{transitionDuration: '2'}}
                alt="Side image of product"
                src={image}
              />
            ))}
          </div>
          <div className="large-image">
            <img
              height={"100%"}
              width={"100%"}
              alt="temp image"
              src={this.state.displayImage}
            />
          </div>
          <div className="item-info-grid">
            <div className="title">
              <h2>{brand}</h2>
              <h3 style={{ fontWeight: "normal" }}>{name}</h3>
            </div>
            {this.renderAttributes(attributes)}
            <div>
              <h4 style={{ fontWeight: "bolder", marginBottom: "5px" }}>
                Price
              </h4>
              {this.renderProductPrice(prices)}
            </div>
            <button
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "green",
                color: "white",
                border: "none",
              }}
            >
              Add to cart
            </button>
              <div dangerouslySetInnerHTML={{__html: `${description}`}} />
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default ProductPage;
