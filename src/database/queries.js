import { gql } from "@apollo/client";

const CATEGORY_AND_CURENCY_NAMES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

const PRODUCT = (id) => {
  return gql`
  {
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }`;
};

const PRODUCTS = (category) => {
  return gql`
    query {
        category (input: {title: "${category}"}){
          products {
            id
            name
            inStock
            gallery
            brand
            attributes {
              id
            }
            prices {
              currency {
                label
                symbol
              }
              amount
            }
          }
        }
      }
    `;
};

export { CATEGORY_AND_CURENCY_NAMES, PRODUCTS, PRODUCT };
