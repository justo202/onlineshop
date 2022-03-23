import * as ActionTypes from "../actionTypes";

export const Cart = (state = [], action) => {
  var newState = [...state]; //copies state
  var product = { ...action.payload }; //copies product info that will be added to the cart
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      // finds the product in the state if it exists
      const exist = state.find(
        (item) =>
          item.id === product.id &&
          keysEqual(item.attributes, product.attributes)
      );
        // if it exists then only increase it's quantity if it does not then add it to the state
      if (exist) {
        newState = newState.map((item) =>
          item.id === product.id &&
          keysEqual(item.attributes, product.attributes)
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        );

        return newState;
      }
      newState.push(product);
      return newState;
      
    case ActionTypes.INCREMENT_AMOUNT:
      newState = newState.map((item) =>
        item.id === product.id && keysEqual(item.attributes, product.attributes)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return newState;
    case ActionTypes.DECREMENT_AMOUNT:
      // if product quantity becomes less than 0 remove it from the list
      if (product.quantity > 1) {
        newState = newState.map((item) =>
          item.id === product.id && keysEqual(item.attributes, product.attributes)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Filters out the product. find it by finding the matching ID and then checking if it has the same attributes
        newState = newState.filter((item) => {
         if (item.id === product.id && keysEqual(item.attributes, product.attributes)) return false;
          return true
        });
      }
      return newState;
    default:
      return state;
  }
};
// from stack overflow https://stackoverflow.com/questions/68338945/how-to-check-equality-of-two-objectsonly-specific-key-values
function keysEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1),
    keys2 = Object.keys(obj2);
  if (
    keys1.length === keys2.length &&
    keys1.every((key) => keys2.includes(key))
  ) {
    return keys1.every((key) => obj1[key][0] === obj2[key][0]);
  } else return false;
}
