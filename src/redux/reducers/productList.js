import * as ActionTypes from "../actionTypes";

export const Products = (
  state = { isLoading: true, products: "this is an empty list" },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PRODUCTS:
      return { ...state, isLoading: false, products: action.payload };
    case ActionTypes.PRODUCTS_LOADING:
      return { ...state, isLoading: true, products: "list is loading" };

    default:
      return state;
  }
};
