import { Map } from 'immutable';
import _ from 'lodash';
import {
  GET_ACCOUNT_LIST,
  UPDATE_PAGE_SORT_ACCOUNT_LIST,
  UPDATE_ACCOUNT_STATUS,
} from './constants';

const initialState = new Map({
  updateAccountStatus: new Map({}),
});

export default (state = initialState, action = {}) => {
  let newState;
  let updateAccountStatus;
  switch (action.type) {
    case UPDATE_PAGE_SORT_ACCOUNT_LIST:
      newState = state.set('page', action.pageable.page).set('sort',action.sort).set('search',action.search);
      break;
    case `${GET_ACCOUNT_LIST}_START`:
      newState = state.set('requesting', true).delete('error');
      break;
    case `${GET_ACCOUNT_LIST}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_ACCOUNT_LIST}_FAILED`:
      newState = state.set('requesting', false).delete('data').set('error', action.error);
      break;
    // UPDATE_ACCOUNT_STATUS
    case `${UPDATE_ACCOUNT_STATUS}_START`:
      updateAccountStatus = state.get('updateAccountStatus');
      newState = state.set(
        'updateAccountStatus',
        updateAccountStatus.set(action.id, {
          requesting: true,
          data: null,
          error: null
        })
      );
      break;
    case `${UPDATE_ACCOUNT_STATUS}_COMPLETED`:
      updateAccountStatus = state.get('updateAccountStatus');
      const data = state.get('data');
      _.each(data.content, item => {
        if (item.id === action.id) {
          item.status = item.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';
        }
      });
      newState = state.set(
        'updateAccountStatus',
        updateAccountStatus.set(action.id, {
          requesting: false,
          data: null,
          error: action.error,
        })
      ).set('data', data);
      break;
    case `${UPDATE_ACCOUNT_STATUS}_FAILED`:
      updateAccountStatus = state.get('updateAccountStatus');
      newState = state.set(
        'updateAccountStatus',
        updateAccountStatus.set(action.id, {
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
