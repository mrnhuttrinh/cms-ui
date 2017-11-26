import { Map } from 'immutable';
import {
  GET_USER_LIST,
  UPDATE_PAGE_SORT_USER_LIST,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case UPDATE_PAGE_SORT_USER_LIST:
      newState = state.set('page', action.pageable.page).set('sort',action.sort);
      break;
    case `${GET_USER_LIST}_START`:
      newState = state.set('requesting', true).delete('data').delete('error');
      break;
    case `${GET_USER_LIST}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_USER_LIST}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
