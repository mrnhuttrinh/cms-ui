import { Map } from 'immutable';
import {
  ADD_NEW_USER,
  CLEAN_CACHE,
} from './constants';

const initialState = new Map({
  newUser: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const newUser = state.get('newUser');
  switch (action.type) {
    case CLEAN_CACHE:
      newState = state.set('newUser', new Map());
      break;
    case `${ADD_NEW_USER}_START`:
      newState = state.set('newUser', newUser.set('requesting', true).delete('data').delete('error'));
      break;
    case `${ADD_NEW_USER}_COMPLETED`:
      newState = state.set('newUser', newUser.set('requesting', false).set('data', action.data).delete('error'));
      break;
    case `${ADD_NEW_USER}_FAILED`:
      newState = state.set('newUser', newUser.set('requesting', false).delete('data').set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
