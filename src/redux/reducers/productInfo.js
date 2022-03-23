import * as ActionTypes from "../actionTypes";

export const ProductInfo = (state = { isLoading: true, productInfo: {}},action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PRODUCT_INFO:
      return {isLoading: false, productInfo: {...action.payload} };
    case ActionTypes.PRODUCT_INFO_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};
