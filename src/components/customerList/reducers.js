import { Map } from 'immutable';
import _ from 'lodash';
import { dataAccesser } from '../commons/table';
import {
  GET_CUSTOMER_LIST,
  UPDATE_CUSTOMER_STATUS,
  UPDATE_CUSTOMER_LIST_STATUS,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
} from './constants';

const initialState = new Map({
  updateCustomerStatus: new Map({}),
  updateCustomerListStatus: new Map({}),
});

export default (state = initialState, action = {}) => {
  let newState;
  let updateCustomerStatus;
  let updateCustomerListStatus;
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
    // UPDATE_CUSTOMER_LIST_STATUS
    case `${UPDATE_CUSTOMER_LIST_STATUS}_START`:
      updateCustomerListStatus = state.get('updateCustomerListStatus');
      newState = state.set(
        'updateCustomerListStatus',
        updateCustomerListStatus.set('requesting', true).delete('error')
      );
      break;
    case `${UPDATE_CUSTOMER_LIST_STATUS}_COMPLETED`:
      updateCustomerListStatus = state.get('updateCustomerListStatus');
       newState = state.set(
        'updateCustomerListStatus',
        updateCustomerListStatus.set('requesting', false).set('data', action.data)
      );
      break;
    case `${UPDATE_CUSTOMER_LIST_STATUS}_FAILED`:
      updateCustomerListStatus = state.get('updateCustomerListStatus');
       newState = state.set(
        'updateAccountListStatus',
        updateCustomerListStatus.set('requesting', false).delete('data').set('error', action.error)
      );
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
      const data = state.get('data');
      _.each(dataAccesser(data), item => {
        if (item.id === action.id) {
          item.status = item.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';
        }
      });
      newState = state.set(
        'updateCustomerStatus',
        updateCustomerStatus.set(action.id, {
          requesting: false,
          data: null,
          error: action.error,
        })
      ).set('data', data);
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
