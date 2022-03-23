import * as ActionTypes from "./actionTypes";
import { getSelectedProducts, getAllCurencyAndCategory, getSelectedProduct } from "../database/databaseFunctions";

// fetches all the product lists in the PLP 
export const fetchProducts = (client, selectedCategory) => (dispatch) => {
  dispatch(productsLoading(true));
  getSelectedProducts(client, selectedCategory).then((result) => {
    if(result !== undefined)
     dispatch(updateProducts(result));
  });
};
// fetches the currency and categories and initalises the total amount in cart
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
// fetches information about the currently viewed product
export const fetchSelectedProductInfo = (client, id) => (dispatch) => {
  dispatch(productInfoLoading(true))
  getSelectedProduct(id, client).then((result) => {
    if(result !== undefined)
      dispatch(updateSelectedProductInfo(result))
  });
}

// filters the PLP page based on the selected category
export const selectCategory = (category) => ({
  type: ActionTypes.UPDATE_SELECTED_CATEGORY,
  payload: category,
});
// sets currency to use
export const selectCurrency = (currency) => ({
  type: ActionTypes.UPDATE_SELECTED_CURRENCY,
  payload: currency,
});
// adds a product to cart
export const addToCart = (product) => (dispatch) => {
  dispatch(add(product));
  dispatch(changeTotal(product.prices, true));
};
// inrements products quantity in cart
export const incrementCartItem = (product) => (dispatch) => {
  dispatch({
    type: ActionTypes.INCREMENT_AMOUNT,
    payload: product,
  });
  dispatch(changeTotal(product.prices, true));
};
// decrements a product in cart
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
const productInfoLoading = () => ({
  type: ActionTypes.PRODUCT_INFO_LOADING
})
const updateSelectedProductInfo = (product) => ({
  type: ActionTypes.UPDATE_PRODUCT_INFO,
  payload: product
})