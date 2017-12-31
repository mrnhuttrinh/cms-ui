import {
  USER_LIST_API,
  GET_ROLE_LIST_API,
} from '../../constants';

import {
  GET_USER_LIST,
  UPDATE_PAGE_SORT_USER_LIST,
  GET_ROLE_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_USER_LIST,
    pageable,
    sort,
    search,
  };
}

export const getUsers = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_USER_LIST,
      // showLoading: true,
      fetchConfig: {
        path: `${USER_LIST_API}&${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
  
  // get role list
export const getRoleList = () =>
(dispatch) => {
  dispatch({
    type: GET_ROLE_LIST,
    fetchConfig: {
      path: GET_ROLE_LIST_API,
      params: {
        method: 'GET'
      },
    }
  });
};
