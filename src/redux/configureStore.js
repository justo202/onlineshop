import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { Products } from "./reducers/productList";
import { Category } from "./reducers/category";
import { Currency } from "./reducers/currency";
import { Cart } from "./reducers/cart";
import { Total } from "./reducers/total";
import { ProductInfo } from "./reducers/productInfo";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  products: Products,
  category: Category,
  currency: Currency,
  cart: Cart,
  total: Total,
  productInfo: ProductInfo

});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)

