import { Map } from 'immutable';
import {
  GET_CUSTOMER,
  GET_ADDRESS_CUSTOMER,
  GET_IDENTIFY_DOCS_CUSTOMER,
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
    case `${GET_ADDRESS_CUSTOMER}_START`:
      newState = state.set('requesting', true).delete('addresses').delete('error');
      break;
    case `${GET_ADDRESS_CUSTOMER}_COMPLETED`:
      newState = state.set('requesting', false).set('addresses', action.data);
      break;
    case `${GET_ADDRESS_CUSTOMER}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    case `${GET_IDENTIFY_DOCS_CUSTOMER}_START`:
      newState = state.set('requesting', true).delete('identifyDocuments').delete('error');
      break;
    case `${GET_IDENTIFY_DOCS_CUSTOMER}_COMPLETED`:
      newState = state.set('requesting', false).set('identifyDocuments', action.data);
      break;
    case `${GET_IDENTIFY_DOCS_CUSTOMER}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
