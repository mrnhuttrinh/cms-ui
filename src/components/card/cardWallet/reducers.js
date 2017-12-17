import { Map } from 'immutable';
import {
  GET_CARD_WALLET,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_CARD_WALLET}_START`:
      newState = state.set('requesting', true).delete('accounts').delete('error');
      break;
    case `${GET_CARD_WALLET}_COMPLETED`:
      newState = state.set('requesting', false).set('accounts', action.data);
      break;
    case `${GET_CARD_WALLET}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
