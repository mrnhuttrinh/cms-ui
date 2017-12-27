import {
  GET_ROLE_LIST_API,
} from '../../constants';

import {
  GET_ROLE_LIST,
  UPDATE_PAGE_SORT_ROLE_LIST
} from './constants';

import { parseParams } from '../../utils';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_ROLE_LIST,
    pageable,
    sort,
    search,
  };
}

export const getRoleList = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_ROLE_LIST,
      fetchConfig: {
        path: `${GET_ROLE_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
