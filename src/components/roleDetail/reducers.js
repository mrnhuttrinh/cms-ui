import { Map } from 'immutable';
import {
  GET_ROLE_DETAIL,
  GET_ROLE_PERMISSION_DETAIL,
} from './constants';

const initialState = new Map({
  roleDetail: new Map(),
  rolePermission: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const roleDetail = state.get('roleDetail');
  const rolePermission = state.get('rolePermission');
  switch (action.type) {
    // fetch role detail
    case `${GET_ROLE_DETAIL}_START`:
      newState = state.set('roleDetail', roleDetail.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_ROLE_DETAIL}_COMPLETED`:
      newState = state.set('roleDetail', roleDetail.set('requesting', false).set('data', action.data));
      break;
    case `${GET_ROLE_DETAIL}_FAILED`:
      newState = state.set('roleDetail', roleDetail.set('requesting', false).set('error', action.error));
      break;
    // fetch role permission
    case `${GET_ROLE_PERMISSION_DETAIL}_START`:
      newState = state.set('rolePermission', rolePermission.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_ROLE_PERMISSION_DETAIL}_COMPLETED`:
      newState = state.set('rolePermission', rolePermission.set('requesting', false).set('data', action.data));
      break;
    case `${GET_ROLE_PERMISSION_DETAIL}_FAILED`:
      newState = state.set('rolePermission', rolePermission.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
