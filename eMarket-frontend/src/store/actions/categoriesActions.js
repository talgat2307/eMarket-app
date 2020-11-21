import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchCategoriesSuccess = (categories) => {
  return { type: FETCH_CATEGORIES_SUCCESS, categories };
};

const fetchCategoriesFail = (error) => {
  return { type: FETCH_CATEGORIES_FAIL, error };
};

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/categories');
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (e) {
      dispatch(fetchCategoriesFail(e));
    }
  };
};