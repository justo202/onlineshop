import * as ActionTypes from "./actionTypes";
import {
  getSelectedProducts,
  getAllCurencyAndCategory,
} from "../database/databaseFunctions";

export const fetchProducts = (client, selectedCategory) => (dispatch) => {
  dispatch(productsLoading(true));
  getSelectedProducts(client, selectedCategory).then((result) => {
    if(result !== undefined)
     dispatch(updateProducts(result));
  });
};
export const fetchNavbarInfo = (client) => (dispatch) => {
  dispatch(navbarLoading(true));
  getAllCurencyAndCategory(client).then((result) => {
    if(result !== undefined){
      dispatch(fetchCategories(result.categories));
      dispatch(fetchCurrency(result.currencies));
      dispatch(initTotal(result.currencies));

    }

  });
};
export const selectCategory = (category) => ({
  type: ActionTypes.UPDATE_SELECTED_CATEGORY,
  payload: category,
});

export const selectCurrency = (currency) => ({
  type: ActionTypes.UPDATE_SELECTED_CURRENCY,
  payload: currency,
});
export const addToCart = (product) => (dispatch) => {
  dispatch(add(product));
  dispatch(changeTotal(product.prices, true));
};
export const incrementCartItem = (product) => (dispatch) => {
  dispatch({
    type: ActionTypes.INCREMENT_AMOUNT,
    payload: product,
  });
  dispatch(changeTotal(product.prices, true));
};
export const decrementCartItem = (product) => (dispatch) => {
  dispatch({
    type: ActionTypes.DECREMENT_AMOUNT,
    payload: product,
  });

  dispatch(changeTotal(product.prices, false));
};
const add = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product,
});
const changeTotal = (prices, isAdded) => ({
  type: ActionTypes.CALCULATE_TOTAL,
  payload: { prices, isAdded },
});
const initTotal = (currencies) => ({
  type: ActionTypes.INIT_TOTAL,
  payload: currencies,
});

const fetchCurrency = (currency) => ({
  type: ActionTypes.GET_CURRENCY,
  payload: currency,
});

const navbarLoading = () => ({
  type: ActionTypes.NAVBAR_LOADING,
});

const fetchCategories = (categories) => ({
  type: ActionTypes.GET_CATEGORIES,
  payload: categories,
});

const productsLoading = () => ({
  type: ActionTypes.PRODUCTS_LOADING,
});

const updateProducts = (products) => ({
  type: ActionTypes.UPDATE_PRODUCTS,
  payload: products,
});
