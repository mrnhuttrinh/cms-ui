import { Map } from 'immutable';
import {
  ADD_NEW_ROLE,
  CLEAN_CACHE,
} from './constants';

const initialState = new Map({
  newRole: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const newRole = state.get('newRole');
  switch (action.type) {
    case CLEAN_CACHE:
      newState = state.set('newRole', new Map());
      break;
    case `${ADD_NEW_ROLE}_START`:
      newState = state.set('newRole', newRole.set('requesting', true).delete('data').delete('error'));
      break;
    case `${ADD_NEW_ROLE}_COMPLETED`:
      newState = state.set('newRole', newRole.set('requesting', false).set('data', action.data).delete('error'));
      break;
    case `${ADD_NEW_ROLE}_FAILED`:
      newState = state.set('newRole', newRole.set('requesting', false).delete('data').set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
