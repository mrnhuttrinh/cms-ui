import { Map } from 'immutable';
import {
  GET_ACCOUNT_CARDS,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_ACCOUNT_CARDS}_START`:
      newState = state.set('requesting', true).delete('cards').delete('error');
      break;
    case `${GET_ACCOUNT_CARDS}_COMPLETED`:
      newState = state.set('requesting', false).set('cards', action.data);
      break;
    case `${GET_ACCOUNT_CARDS}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
