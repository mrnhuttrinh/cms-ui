import { Map } from 'immutable';
import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  DEPOSIT_AMOUNT_TO_ACCOUNT,
} from './constants';

const initialState = new Map({
  depositToAccount: new Map()
});

export default (state = initialState, action = {}) => {
  let newState;
  const depositToAccount = state.get('depositToAccount');
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
    // deposit to account
    case `${DEPOSIT_AMOUNT_TO_ACCOUNT}_START`:
      newState = state.set('depositToAccount', depositToAccount.set('requesting', true).delete('data').delete('error'));
      break;
    case `${DEPOSIT_AMOUNT_TO_ACCOUNT}_COMPLETED`:
      newState = state.set('depositToAccount', depositToAccount.set('requesting', false).set('data', action.data).delete('error'));
      break;
    case `${DEPOSIT_AMOUNT_TO_ACCOUNT}_FAILED`:
      newState = state.set('depositToAccount', depositToAccount.set('requesting', false).delete('data').set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
