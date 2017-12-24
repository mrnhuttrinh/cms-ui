import { Map } from 'immutable';
import {
  GET_CARD_WALLET,
  CREATE_CARD_WALLET,
  DISCONNECT_CARD_WALLET,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_CARD_WALLET}_START`:
      newState = state.set('requesting', true).delete('wallets').delete('error').delete('createWalletCompleted').delete('disconnectWalletCompleted');
      break;
    case `${GET_CARD_WALLET}_COMPLETED`:
      newState = state.set('requesting', false).set('wallets', action.data);
      break;
    case `${GET_CARD_WALLET}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    case `${CREATE_CARD_WALLET}_START`:
      newState = state.set('creating', true).delete('creatingError');
      break;
    case `${CREATE_CARD_WALLET}_COMPLETED`:
      newState = state.set('creating', false).set('createWalletCompleted', action.data);
      break;
    case `${CREATE_CARD_WALLET}_FAILED`:
      newState = state.set('creating', false).set('creatingError', action.error);
      break;
    case `${DISCONNECT_CARD_WALLET}_START`:
      newState = state.set('disconnecting', true).delete('disconnectingError');
      break;
    case `${DISCONNECT_CARD_WALLET}_COMPLETED`:
      newState = state.set('disconnecting', false).set('disconnectWalletCompleted', action.data);
      break;
    case `${DISCONNECT_CARD_WALLET}_FAILED`:
      newState = state.set('disconnecting', false).set('disconnectingError', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
