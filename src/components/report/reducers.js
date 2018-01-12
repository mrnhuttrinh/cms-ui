import { Map } from 'immutable';
import {
  GET_REPORT,
  UPDATE_SEARCH_REPORT,
} from './constants';

const initialState = new Map({});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case UPDATE_SEARCH_REPORT:
      newState = state.set('search',action.search);
      break;
    case `${GET_REPORT}_START`:
      newState = state.set('requesting', true).delete('error');
      break;
    case `${GET_REPORT}_COMPLETED`:
      newState = state.set('requesting', false).set('data', action.data);
      break;
    case `${GET_REPORT}_FAILED`:
      newState = state.set('requesting', false).delete('data').set('error', action.error);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
