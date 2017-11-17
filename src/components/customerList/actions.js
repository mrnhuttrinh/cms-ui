import URLSearchParams from 'url-search-params';
import {
  CUSTOMER_LIST_API,
} from '../../constants';

import {
  GET_CUSTOMER_LIST,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
} from './constants';

const updatePageAndSort = (pageable, sort) => {
  return {
    type: UPDATE_PAGE_SORT_CUSTOMER_LIST,
    pageable,
    sort,
  };
}

export const getCustomer = (pageable, sort) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const params = new URLSearchParams({...pageable, sort:`${sort.key},${sort.type}`});
    dispatch({
      type: GET_CUSTOMER_LIST,
      fetchConfig: {
        path: `${CUSTOMER_LIST_API}?${params.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
