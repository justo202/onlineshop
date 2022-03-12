import * as ActionTypes from "../actionTypes";

export const Total = (
  state = [{ symbol: "$", label: "USD", amount: 0 }],
  action
) => {
  switch (action.type) {
    case ActionTypes.CALCULATE_TOTAL:
      const { prices, isAdded } = action.payload;

      var newState = state.map((price) => {
        const productPrice = prices.filter((item) =>
          compare(item.currency, price)
        )[0]; // gets the product price for the correct currency
        var total = isAdded
          ? price.amount + productPrice.amount
          : price.amount - productPrice.amount;
        return { ...price, amount: total >= 0 ? total : 0 }; //if for some reason total becomes less than 0 return 0 instead of a negative number
      });

      return newState;
    case ActionTypes.INIT_TOTAL:
      if (state[0].amount == 0)
        return action.payload.map((item) => ({ ...item, amount: 0 }));
      else {
        return state;
      }

    default:
      return state;
  }
};

// checks if the curency matches
function compare(a, b) {
  return a.label === b.label;
}
