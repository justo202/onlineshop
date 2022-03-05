import React, { Component } from 'react';
import { CATEGORY_AND_CURENCY_NAMES } from '../database/queries'
import CurrencySelect from './CurrencySelect';
import { Link } from 'react-router-dom';


class Navbar extends Component {
    constructor(props) {
        super(props)
 
    }
   
    render() {
        
        const { changeCategory, isLoading, categories, currencies, currency, setCurrency, changeDisplayBackground } = this.props
        
        return(
            
            <div style={{display: 'block', zIndex: 999, position: 'relative'}}>
                            <div className='navbar'>
                <div className='navigation'>
                    {isLoading ?
                        <h5>loading...</h5>
                        :
                        categories.map((item, index) => <Link to={'/'}key={index} onClick={() => changeCategory(item.name)}> <p>{item.name}</p></Link>)
                    }
                </div>
                <h1>LOGO</h1>
                {isLoading ? 
                    <h5>loading...</h5>
                    :
                    <CurrencySelect changeDisplayBackground={changeDisplayBackground} setCurrency={setCurrency} currencies={currencies}selected={currency}/>
                }         
             </div>

            </div>
            


        )
    }


}
export default Navbar;