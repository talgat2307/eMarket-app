import {
  ADD_PRODUCTS_FAIL,
  ADD_PRODUCTS_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  PRODUCTS_BY_CATEGORY_FAIL,
  PRODUCTS_BY_CATEGORY_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchProductsSuccess = (products) => {
  return { type: FETCH_PRODUCTS_SUCCESS, products };
};

const fetchProductsFail = (error) => {
  return { type: FETCH_PRODUCTS_FAIL, error };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/products');
      dispatch(fetchProductsSuccess(response.data));
    } catch (e) {
      dispatch(fetchProductsFail(e));
    }
  };
};

const addProductSuccess = () => {
  return { type: ADD_PRODUCTS_SUCCESS };
};

const addProductsFail = (error) => {
  return { type: ADD_PRODUCTS_FAIL, error };
};

export const addProduct = (product) => {
  return async (dispatch, getState) => {
    const token = getState().users.userInfo.user.token;
    const headers = { 'Authorization': token };

    try {
      await axiosApi.post('/products', product, { headers });
      dispatch(addProductSuccess());
    } catch (e) {
      dispatch(addProductsFail(e));
    }
  };
};

const fetchProductSuccess = (productDetail) => {
  return { type: FETCH_PRODUCT_SUCCESS, productDetail };
};

const fetchProductFail = (error) => {
  return { type: FETCH_PRODUCT_FAIL, error };
};

export const fetchProductDetail = (id) => {
  return async dispatch => {
    try {
      const response = await axiosApi(`/products/${id}`);
      dispatch(fetchProductSuccess(response.data));
    } catch (e) {
      dispatch(fetchProductFail(e));
    }
  };
};

const productsByCategorySuccess = (products) => {
  return { type: PRODUCTS_BY_CATEGORY_SUCCESS, products };
};

const productsByCategoryFail = (error) => {
  return { type: PRODUCTS_BY_CATEGORY_FAIL, error };
};

export const fetchProductsByCategory = (id) => {
  return async dispatch => {
    try {
      const response = await axiosApi(`/products?category=${id}`);
      dispatch(productsByCategorySuccess(response.data));
    } catch (e) {
      dispatch(productsByCategoryFail(e));
    }
  };
};

const deleteProductSuccess = () => {
  return { type: DELETE_PRODUCT_SUCCESS };
};

const deleteProductFail = (error) => {
  return { type: DELETE_PRODUCT_FAIL, error };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().users.userInfo.user.token;
    const headers = { 'Authorization': token };

    try {
      await axiosApi.delete(`/products/${id}`, {headers});
      dispatch(deleteProductSuccess());
    } catch (e) {
      dispatch(deleteProductFail(e));
    }
  };
};
