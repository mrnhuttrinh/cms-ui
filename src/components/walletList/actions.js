import {
  WALLET_LIST_API,
} from '../../constants';

import {
  GET_WALLET_LIST,
  UPDATE_PAGE_SORT_WALLET_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_WALLET_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCardList = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_WALLET_LIST,
      fetchConfig: {
        path: `${WALLET_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
