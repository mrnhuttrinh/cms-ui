import {
  MERCHANT_LIST_API,
} from '../../constants';

import {
  GET_MERCHANT_LIST,
  UPDATE_PAGE_SORT_MERCHANT_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_MERCHANT_LIST,
    pageable,
    sort,
    search,
  };
}

export const getMerchants = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_MERCHANT_LIST,
      fetchConfig: {
        path: `${MERCHANT_LIST_API}&${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
