import {
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAILURE,
  GET_BRAND_LIST_REQUEST,
  GET_BRAND_LIST_SUCCESS,
  GET_BRAND_LIST_FAILURE,
} from '../actions/brand';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function goods(state = {
  isFetching: false,
  errorMessage: '',
  brandList: [],
}, action) {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case CREATE_BRAND_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // newGoods: action.goods,
        errorMessage: '',
      });
    case CREATE_BRAND_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });

    case GET_BRAND_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case GET_BRAND_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        brandList: action.brandList,
        errorMessage: '',
      });
    case GET_BRAND_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    default:
      return state;
  }
}
