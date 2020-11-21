import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  categories: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.categories };
    case FETCH_CATEGORIES_FAIL:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default categoriesReducer;