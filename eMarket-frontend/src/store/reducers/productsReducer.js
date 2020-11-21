import {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  PRODUCTS_BY_CATEGORY_FAIL,
  PRODUCTS_BY_CATEGORY_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  products: null,
  productDetail: null,
  productsByCategory: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.products };
    case FETCH_PRODUCTS_FAIL:
      return { ...state, error: action.error };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, productDetail: action.productDetail };
    case FETCH_PRODUCT_FAIL:
      return { ...state, error: action.error };
    case PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state, productsByCategory: action.products };
    case PRODUCTS_BY_CATEGORY_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default productsReducer;