import { Map } from 'immutable';
import {
  SUBMIT_LOGIN,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${SUBMIT_LOGIN}_START`:
      newState = state.set('requesting', true).delete('data').delete('error');
      break;
    case `${SUBMIT_LOGIN}_COMPLETED`:
      // for sample authenticate
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${SUBMIT_LOGIN}_FAILED`:
      // for sample authenticate
      // newState = state.set('requesting', true).delete('data').delete('error');
      newState = state.set('requesting', false).set('data', {credential: true});
      // newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}