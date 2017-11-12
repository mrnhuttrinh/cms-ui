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
      newState = state.set('requesting', false).set('data', {credential: true});
      break;
    case `${SUBMIT_LOGIN}_FAILED`:
      newState = state.set('requesting', false).set('data', {credential: false}); 
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
