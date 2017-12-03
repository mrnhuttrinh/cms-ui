import {
  TRANSACTIONS_BY_CARD_API,
} from '../../../constants';

import {
  GET_TRANSACTION_LIST_BY_CARD,
  UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_CARD,
} from './constants';

import { parseParams } from '../../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_TRANSACTION_LIST_BY_CARD,
    pageable,
    sort,
    search,
  };
}

export const getTransaction = (id, pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_TRANSACTION_LIST_BY_CARD,
      fetchConfig: {
        path: `${TRANSACTIONS_BY_CARD_API.replace('{cardNumber}', id)}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
