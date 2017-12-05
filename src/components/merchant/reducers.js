import { Map } from 'immutable';
import {
  GET_MERCHANT_DETAIL,
  GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL,
  GET_MERCHANT_HISTORY,
} from './constants';

const initialState = new Map({
  generalInformation: new Map(),
  terminal: new Map(),
  merchantHistories: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const generalInformation = state.get('generalInformation');
  const terminal = state.get('terminal');
  const merchantHistories = state.get('merchantHistories');
  switch (action.type) {
    // fetch merchant detail
    case `${GET_MERCHANT_DETAIL}_START`:
      newState = state.set('generalInformation', generalInformation.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_MERCHANT_DETAIL}_COMPLETED`:
      newState = state.set('generalInformation', generalInformation.set('requesting', false).set('data', action.data));
      break;
    case `${GET_MERCHANT_DETAIL}_FAILED`:
      newState = state.set('generalInformation', generalInformation.set('requesting', false).set('error', action.error));
      break;
    
    // fetch merchant terminal by merchant 
    case `${GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL}_START`:
      newState = state.set('terminal', terminal.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL}_COMPLETED`:
      newState = state.set('terminal', terminal.set('requesting', false).set('data', action.data));
      break;
    case `${GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL}_FAILED`:
      newState = state.set('terminal', terminal.set('requesting', false).set('error', action.error));
      break;

    // fetch merchant history by id 
    case `${GET_MERCHANT_HISTORY}_START`:
      newState = state.set('merchantHistories', merchantHistories.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_MERCHANT_HISTORY}_COMPLETED`:
      newState = state.set('merchantHistories', merchantHistories.set('requesting', false).set('data', action.data));
      break;
    case `${GET_MERCHANT_HISTORY}_FAILED`:
      newState = state.set('merchantHistories', merchantHistories.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
