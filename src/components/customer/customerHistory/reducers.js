import { Map } from 'immutable';
import {
  GET_ACCOUNT_HISTORY_BY_CUSTOMER,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_ACCOUNT_HISTORY_BY_CUSTOMER}_START`:
      newState = state.set('requesting', true).delete('accountHistory').delete('error');
      break;
    case `${GET_ACCOUNT_HISTORY_BY_CUSTOMER}_COMPLETED`:
      newState = state.set('requesting', false).set('accountHistory', action.data);
      break;
    case `${GET_ACCOUNT_HISTORY_BY_CUSTOMER}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
