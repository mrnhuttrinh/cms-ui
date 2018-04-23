import { Map } from 'immutable';
import {
  GET_CUSTOMER_LIST,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
  UPDATE_CUSTOMER_STATUS,
} from './constants';

const initialState = new Map({
  updateCustomerStatus: new Map({}),
});

export default (state = initialState, action = {}) => {
  let newState;
  let updateCustomerStatus;
  switch (action.type) {
    case UPDATE_PAGE_SORT_CUSTOMER_LIST:
      newState = state.set('page', action.pageable.page).set('sort',action.sort).set('search',action.search);
      break;
    case `${GET_CUSTOMER_LIST}_START`:
      newState = state.set('requesting', true).delete('error');
      break;
    case `${GET_CUSTOMER_LIST}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_CUSTOMER_LIST}_FAILED`:
      newState = state.set('requesting', false).delete('data').set('error', action.error);
      break;
    // UPDATE_CUSTOMER_STATUS
    case `${UPDATE_CUSTOMER_STATUS}_START`:
      updateCustomerStatus = state.get('updateCustomerStatus');
      newState = state.set(
        'updateCustomerStatus',
        updateCustomerStatus.set(action.id, {
          requesting: true,
          data: null,
          error: null
        })
      );
      break;
    case `${UPDATE_CUSTOMER_STATUS}_COMPLETED`:
      updateCustomerStatus = state.get('updateCustomerStatus');
      newState = state.set(
        'updateCustomerStatus',
        updateCustomerStatus.set(action.id, {
          requesting: false,
          data: null,
          error: action.error,
        })
      );
      break;
    case `${UPDATE_CUSTOMER_STATUS}_FAILED`:
      updateCustomerStatus = state.get('updateCustomerStatus');
      newState = state.set(
        'updateCustomerStatus',
        updateCustomerStatus.set(action.id, {
          requesting: false,
          data: null,
          error: action.error,
        })
      );
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
