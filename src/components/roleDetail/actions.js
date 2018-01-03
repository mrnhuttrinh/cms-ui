import {
  GET_ROLE_DETAIL_API,
  GET_ROLE_PERMISSION_API,
  GET_ALL_PERMISSION_API,
  UPDATE_ROLE_PERMISSION_API,
} from '../../constants';

import {
  GET_ROLE_DETAIL,
  GET_ROLE_PERMISSION_DETAIL,
  UPDATE_PAGE_SORT_ROLE_PERMISSION_LIST,
  GET_ALL_PERMISSION,
  UPDATE_ROLE_PERMISSION,
} from './constants';

import { parseParams } from '../../utils';

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

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_ROLE_PERMISSION_LIST,
    pageable,
    sort,
    search,
  };
}

export const getRolePermissionDetail = (id, pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_ROLE_PERMISSION_DETAIL,
      fetchConfig: {
        path: `${GET_ROLE_PERMISSION_API.replace('{id}', id)}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };

  export const getAllPermission = () => {
    return {
      type: GET_ALL_PERMISSION,
      fetchConfig: {
        path: GET_ALL_PERMISSION_API,
        params: {
          method: 'GET'
        },
      }
    };
  };

// update role permission


export const updateRolePermission = (id, data) => {
  return {
    type: UPDATE_ROLE_PERMISSION,
    showMessage: {
      success: {
        title: 'Success!',
        message: 'Update role permission success',
      },
      error: {
        title: 'Error!',
        message: 'Update role permission failure',
      },
    },
    fetchConfig: {
      path: UPDATE_ROLE_PERMISSION_API.replace('{id}', id),
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          data
        ),
      },
    }
  };
}