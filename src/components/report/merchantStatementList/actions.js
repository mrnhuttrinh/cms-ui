import {
  MERCHANT_STATEMENT_LIST_API,
} from '../../../constants';

import {
  GET_MERCHANT_STATEMENT_LIST,
  UPDATE_PAGE_SORT_MERCHANT_STATEMENT_LIST,
} from './constants';

import { parseParams } from '../../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_MERCHANT_STATEMENT_LIST,
    pageable,
    sort,
    search,
  };
}

export const getMerchantStatement = (merchantId, pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    const url = `${MERCHANT_STATEMENT_LIST_API}${merchantId ? `&merchant.id=${merchantId}` : ''}`
    dispatch({
      type: GET_MERCHANT_STATEMENT_LIST,
      fetchConfig: {
        path: `${url}&${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
