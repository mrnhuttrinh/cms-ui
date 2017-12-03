import { Map } from 'immutable';
import {
  GET_TRANSACTION_LIST_BY_CARD,
  UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_CARD,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_CARD:
      newState = state.set('page', action.pageable.page).set('sort',action.sort).set('search',action.search);
      break;
    case `${GET_TRANSACTION_LIST_BY_CARD}_START`:
      newState = state.set('requesting', true).delete('error');
      break;
    case `${GET_TRANSACTION_LIST_BY_CARD}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_TRANSACTION_LIST_BY_CARD}_FAILED`:
      newState = state.set('requesting', false).delete('data').set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
