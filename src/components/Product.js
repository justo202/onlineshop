import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Product extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {img, name, price, symbol, inStock, id} = this.props
        return (
            <Link style={{textDecoration: 'none', color: 'inherit'}}to={`/product/${id}`}  className={`productContainer ${inStock ? "" : "soldOut"}`}>
                <div style={{display: `${inStock ? "none" : "block"}`}}className='center'>
                    <h3>OUT OF STOCK</h3>
                </div>
             

            <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', maxHeight: '250px', marginBlockEnd: '10px'}}src={img} alt={name}/>
            <h5>{name}</h5>
            <p>{price} {symbol}</p>
        </Link>
        );
    }

}


export default Product