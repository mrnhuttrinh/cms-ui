import {
  TRANSACTIONS_BY_ACCOUNT_ID_API,
} from '../../../constants';

import {
  GET_TRANSACTION_LIST_BY_ACCOUNT,
  UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_ACCOUNT,
} from './constants';

import { parseParams } from '../../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_ACCOUNT,
    pageable,
    sort,
    search,
  };
}

export const getTransaction = (id, pageable, sort, search) =>
  (dispatch) => {

    console.log(search);
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_TRANSACTION_LIST_BY_ACCOUNT,
      fetchConfig: {
        path: `${TRANSACTIONS_BY_ACCOUNT_ID_API.replace('{accountId}', id)}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
