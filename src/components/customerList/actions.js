import {
  CUSTOMER_LIST_API,
} from '../../constants';

import {
  GET_CUSTOMER_LIST,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_CUSTOMER_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCustomer = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_CUSTOMER_LIST,
      fetchConfig: {
        path: `${CUSTOMER_LIST_API}&${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
