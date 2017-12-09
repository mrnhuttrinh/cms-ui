import { Map } from 'immutable';
import {
  FETCH_USER_PROFILE,
  CHANGE_PASSWORD,
} from './constants';

const initialState = new Map({
  userProfile: new Map(),
  updatePassword: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const userProfile = state.get('userProfile');
  const updatePassword = state.get('updatePassword');
  switch (action.type) {
    // fetch user profile
    case `${FETCH_USER_PROFILE}_START`:
      newState = state.set('userProfile', userProfile.set('requesting', true).delete('data').delete('error'));
      break;
    case `${FETCH_USER_PROFILE}_COMPLETED`:
      newState = state.set('userProfile', userProfile.set('requesting', false).set('data', action.data));
      break;
    case `${FETCH_USER_PROFILE}_FAILED`:
      newState = state.set('userProfile', userProfile.set('requesting', false).set('error', action.error));
      break;
      // update password
    case `${CHANGE_PASSWORD}_START`:
      newState = state.set('updatePassword', updatePassword.set('requesting', true).delete('data').delete('error'));
      break;
    case `${CHANGE_PASSWORD}_COMPLETED`:
      newState = state.set('updatePassword', updatePassword.set('requesting', false).set('data', action.data));
      break;
    case `${CHANGE_PASSWORD}_FAILED`:
      newState = state.set('updatePassword', updatePassword.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
