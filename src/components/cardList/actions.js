import {
  CARD_LIST_API,
} from '../../constants';

import {
  GET_CARD_LIST,
  UPDATE_PAGE_SORT_CARD_LIST,
} from './constants';

import { parseParams } from '../../utils';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_CARD_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCardList = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_CARD_LIST,
      fetchConfig: {
        path: `${CARD_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
