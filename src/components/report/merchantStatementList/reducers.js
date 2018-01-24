import { Map } from 'immutable';
import {
  GET_MERCHANT_STATEMENT_LIST,
  UPDATE_PAGE_SORT_MERCHANT_STATEMENT_LIST,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case UPDATE_PAGE_SORT_MERCHANT_STATEMENT_LIST:
      newState = state.set('page', action.pageable.page).set('sort',action.sort).set('search',action.search);
      break;
    case `${GET_MERCHANT_STATEMENT_LIST}_START`:
      newState = state.set('requesting', true).delete('error');
      break;
    case `${GET_MERCHANT_STATEMENT_LIST}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_MERCHANT_STATEMENT_LIST}_FAILED`:
      newState = state.set('requesting', false).delete('data').set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
