import { Map } from 'immutable';
import {
  ADD_NEW_CUSTOMER,
  CLEAN_CACHE,
} from './constants';

const initialState = new Map({
  addCustomer: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const addCustomer = state.get('addCustomer');
  switch (action.type) {
    case CLEAN_CACHE:
      newState = state.set('addCustomer', new Map());
      break;
    case `${ADD_NEW_CUSTOMER}_START`:
      newState = state.set(
        'addCustomer',
        addCustomer.set('requesting', true).delete('data').delete('error')
      );
      break;
    case `${ADD_NEW_CUSTOMER}_COMPLETED`:
      newState = state.set(
        'addCustomer',
        addCustomer.set('requesting', false).set('data', action.data).delete('error')
      );
      break;
    case `${ADD_NEW_CUSTOMER}_FAILED`:
      newState = state.set(
        'addCustomer',
        addCustomer.set('requesting', false).delete('data').set('error', action.error)
      );
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
