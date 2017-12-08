import { Map } from 'immutable';
import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_ACCOUNT}_START`:
      newState = state.set('requesting', true).delete('account').delete('error');
      break;
    case `${GET_ACCOUNT}_COMPLETED`:
      newState = state.set('requesting', false).set('account', action.data);
      break;
    case `${GET_ACCOUNT}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    case `${UPDATE_ACCOUNT}_START`:
      newState = state.set('updateRequesting', true).delete('updateError');
      break;
    case `${UPDATE_ACCOUNT}_COMPLETED`:
      const account = state.get('account');
      account.status = action.data.status;
      newState = state.set('updateRequesting', false).set('account', account);
      break;
    case `${UPDATE_ACCOUNT}_FAILED`:
      newState = state.set('updateRequesting', false).set('updateError', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
