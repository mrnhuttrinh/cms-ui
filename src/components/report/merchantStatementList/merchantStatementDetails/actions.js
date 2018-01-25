import {
  MERCHANT_STATEMENT_DETAILS_LIST_API,
} from '../../../../constants';

import {
  GET_MERCHANT_STATEMENT_DETAILS_LIST,
  UPDATE_PAGE_SORT_MERCHANT_STATEMENT_DETAILS_LIST,
} from './constants';

import { parseParams } from '../../../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_MERCHANT_STATEMENT_DETAILS_LIST,
    pageable,
    sort,
    search,
  };
}

export const getMerchantStatementDetails = (merchantStatementId,pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_MERCHANT_STATEMENT_DETAILS_LIST,
      fetchConfig: {
        path: `${MERCHANT_STATEMENT_DETAILS_LIST_API}&merchantStatement.id=${merchantStatementId}&${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
