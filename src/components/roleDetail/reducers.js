import { Map } from 'immutable';
import {
  GET_ROLE_DETAIL,
  GET_ROLE_PERMISSION_DETAIL,
  UPDATE_PAGE_SORT_ROLE_PERMISSION_LIST,
  GET_ALL_PERMISSION,
  UPDATE_ROLE_PERMISSION,
} from './constants';

const initialState = new Map({
  roleDetail: new Map(),
  rolePermission: new Map(),
  allPermission: new Map(),
  updateRolePermission: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const roleDetail = state.get('roleDetail');
  const rolePermission = state.get('rolePermission');
  const allPermission = state.get('allPermission');
  const updateRolePermission = state.get('updateRolePermission');
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
    case UPDATE_PAGE_SORT_ROLE_PERMISSION_LIST:
      newState = state.set('rolePermission', rolePermission.set('page', action.pageable.page).set('sort',action.sort).set('search',action.search));
      break;
    case `${GET_ROLE_PERMISSION_DETAIL}_START`:
      newState = state.set('rolePermission', rolePermission.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_ROLE_PERMISSION_DETAIL}_COMPLETED`:
      newState = state.set('rolePermission', rolePermission.set('requesting', false).set('data', action.data));
      break;
    case `${GET_ROLE_PERMISSION_DETAIL}_FAILED`:
      newState = state.set('rolePermission', rolePermission.set('requesting', false).set('error', action.error));
      break;
    // fetch all permission
    case `${GET_ALL_PERMISSION}_START`:
      newState = state.set('allPermission', allPermission.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_ALL_PERMISSION}_COMPLETED`:
      newState = state.set('allPermission', allPermission.set('requesting', false).set('data', action.data));
      break;
    case `${GET_ALL_PERMISSION}_FAILED`:
      newState = state.set('allPermission', allPermission.set('requesting', false).set('error', action.error));
      break;
    // update role permission
    case `${UPDATE_ROLE_PERMISSION}_START`:
      newState = state.set('updateRolePermission', updateRolePermission.set('requesting', true).delete('data').delete('error'));
      break;
    case `${UPDATE_ROLE_PERMISSION}_COMPLETED`:
      newState = state.set('updateRolePermission', updateRolePermission.set('requesting', false).set('data', action.data));
      break;
    case `${UPDATE_ROLE_PERMISSION}_FAILED`:
      newState = state.set('updateRolePermission', updateRolePermission.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
