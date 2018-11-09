import {
  CREATE_GOODS_REQUEST,
  CREATE_GOODS_SUCCESS,
  CREATE_GOODS_FAILURE,
  GET_GOODS_LIST_REQUEST,
  GET_GOODS_LIST_SUCCESS,
  GET_GOODS_LIST_FAILURE,
} from '../actions/goods';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function goods(state = {
  isFetching: false,
  errorMessage: '',
  goodsList: [],
}, action) {
  switch (action.type) {
    case CREATE_GOODS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case CREATE_GOODS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // newGoods: action.goods,
        errorMessage: '',
      });
    case CREATE_GOODS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });

    case GET_GOODS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case GET_GOODS_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        goodsList: action.goodsList,
        errorMessage: '',
      });
    case GET_GOODS_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    default:
      return state;
  }
}
