import { Map } from 'immutable';
import {
  GET_CARD,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case `${GET_CARD}_START`:
      newState = state.set('requesting', true).delete('card').delete('error');
      break;
    case `${GET_CARD}_COMPLETED`:
      newState = state.set('requesting', false).set('card', action.data);
      break;
    case `${GET_CARD}_FAILED`:
      newState = state.set('requesting', false).set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
