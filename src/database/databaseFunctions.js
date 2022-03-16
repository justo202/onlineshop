import { PRODUCTS, CATEGORY_AND_CURENCY_NAMES, PRODUCT } from "./queries";

export const getSelectedProducts = (client, selectedCategory) =>
  client
    .query({
      query: PRODUCTS(selectedCategory),
    })
    .then((result) => {
      return result.data.category.products;
    }).catch(() => {
      console.log('Failed to fetch products!')
    });

export const getAllCurencyAndCategory = (client) =>
  client
    .query({
      query: CATEGORY_AND_CURENCY_NAMES,
    })
    .then((result) => {
      return {
        categories: result.data.categories,
        currencies: result.data.currencies,
      };
    }).catch(() => {
      console.log('Failed to fetch currency and category!')
    });

export const getSelectedProduct = (productId, client) =>
  client
    .query({
      query: PRODUCT(productId),
    })
    .then((result) => {
      var attributeMap = {};
      result.data.product.attributes.forEach((element) => {
        attributeMap[element.id] = "";
      });
      return {
        productLoading: result.loading,
        productInfo: result.data.product,
        selectedAttributes: attributeMap,
        displayImage: result.data.product.gallery[0],
      };
    }).catch(() => {
      console.log('Failed to fetch selected product!')
    });
