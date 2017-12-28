import {
  GET_ROLE_DETAIL_API,
  GET_ROLE_PERMISSION_API,
} from '../../constants';

import {
  GET_ROLE_DETAIL,
  GET_ROLE_PERMISSION_DETAIL,
} from './constants';

export const getRoleDetail = id => {
  return {
    type: GET_ROLE_DETAIL,
    fetchConfig: {
      path: GET_ROLE_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const getRolePermissionDetail = id => {
  return {
    type: GET_ROLE_PERMISSION_DETAIL,
    fetchConfig: {
      path: GET_ROLE_PERMISSION_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};