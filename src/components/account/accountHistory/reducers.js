import { Map } from 'immutable';
import {
  GET_ACCOUNT_HISTORY,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_ACCOUNT_HISTORY}_START`:
      newState = state.set('requesting', true).delete('history').delete('error');
      break;
    case `${GET_ACCOUNT_HISTORY}_COMPLETED`:
      newState = state.set('requesting', false).set('history', action.data);
      break;
    case `${GET_ACCOUNT_HISTORY}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
