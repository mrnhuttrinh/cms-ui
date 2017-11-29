import {
  ACCOUNT_LIST_API,
} from '../../constants';

import {
  GET_ACCOUNT_LIST,
  UPDATE_PAGE_SORT_ACCOUNT_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_ACCOUNT_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCustomer = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_ACCOUNT_LIST,
      fetchConfig: {
        path: `${ACCOUNT_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
