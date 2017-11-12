import { Map } from 'immutable';
import {
  GET_CUSTOMER,
  GET_ACCOUNTS_BY_CUSTOMER,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_CUSTOMER}_START`:
      newState = state.set('requesting', true).delete('customer').delete('error');
      break;
    case `${GET_CUSTOMER}_COMPLETED`:
      newState = state.set('requesting', false).set('customer', action.data);
      break;
    case `${GET_CUSTOMER}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    case `${GET_ACCOUNTS_BY_CUSTOMER}_START`:
      newState = state.set('requesting', true).delete('accounts').delete('error');
      break;
    case `${GET_ACCOUNTS_BY_CUSTOMER}_COMPLETED`:
      newState = state.set('requesting', false).set('accounts', action.data);
      break;
    case `${GET_ACCOUNTS_BY_CUSTOMER}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
