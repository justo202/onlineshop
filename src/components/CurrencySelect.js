import React, { Component } from "react";

class CurrencySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: props.currencies,
      selectedCurrency: props.selected,
      isListOpen: false,
    };
  }

  openMenu = () => {
    this.props.changeDisplayBackground()
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
   }))
 }

 selectItem = (item) => {
    const { setCurrency } = this.props;
    this.setState({
    selectedCurrency: item,
    isListOpen: false,
    }, () => setCurrency(item));
  }

  closeMenu = () => {
    this.props.changeDisplayBackground()
    this.setState({
      isListOpen: false,
    });
  }
  componentDidUpdate(){
    const { isListOpen } = this.state;
    setTimeout(() => {
      if(isListOpen){
        window.addEventListener('click', this.closeMenu)
      }
      else{
        window.removeEventListener('click', this.closeMenu)
      }
    }, 0)
  }
  render() {
      
    const { currencies, selectedCurrency, isListOpen } = this.state;
    return (
      <>
      <div>
        <button
          type="button"
          onClick={!isListOpen ? (() => this.openMenu()) : undefined}
          className="currencyBtn"
        >
          <h4>{selectedCurrency.symbol} {selectedCurrency.label}</h4>
        </button>
        {isListOpen && (
          <div type="list" className="dropDown">
            {currencies.map((item) => (
              <button
                type="button"
                className="dd-item currencyBtn"
                key={item.symbol}
                onClick={() => this.selectItem(item)}
              >
                <h4>{item.symbol} {item.label}</h4>
              </button>
            ))}
          </div>
        )}
      </div>

      </>
    );
  }
}

export default CurrencySelect;
