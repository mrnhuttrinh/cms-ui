import { Map } from 'immutable';
import {
  GET_USER_DETAIL,
  GET_USER_HISTORY,
} from './constants';

const initialState = new Map({
  userDetail: new Map(),
  userHistories: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const userDetail = state.get('userDetail');
  const userHistories = state.get('userHistories');
  switch (action.type) {
    // fetch user detail
    case `${GET_USER_DETAIL}_START`:
      newState = state.set('userDetail', userDetail.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_USER_DETAIL}_COMPLETED`:
      newState = state.set('userDetail', userDetail.set('requesting', false).set('data', action.data));
      break;
    case `${GET_USER_DETAIL}_FAILED`:
      newState = state.set('userDetail', userDetail.set('requesting', false).set('error', action.error));
      break;
    // fetch user history
    case `${GET_USER_HISTORY}_START`:
      newState = state.set('userHistories', userHistories.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_USER_HISTORY}_COMPLETED`:
      newState = state.set('userHistories', userHistories.set('requesting', false).set('data', action.data));
      break;
    case `${GET_USER_HISTORY}_FAILED`:
      newState = state.set('userHistories', userHistories.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
