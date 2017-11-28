import { Map } from 'immutable';
import {
  GET_ACCOUNT,
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
    default:
      newState = state;
      break;
  }

  return newState;
}
