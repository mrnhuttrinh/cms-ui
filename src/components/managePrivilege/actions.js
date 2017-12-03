import URLSearchParams from 'url-search-params';
import {
  USER_LIST_API,
} from '../../constants';

import {
  GET_USER_LIST,
  UPDATE_PAGE_SORT_USER_LIST,
} from './constants';

const updatePageAndSort = (pageable, sort) => {
  return {
    type: UPDATE_PAGE_SORT_USER_LIST,
    pageable,
    sort,
  };
}

export const getCustomer = (pageable, sort) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const params = new URLSearchParams({...pageable, sort:`${sort.key},${sort.type}`});
    dispatch({
      type: GET_USER_LIST,
      fetchConfig: {
        path: `${USER_LIST_API}&${params.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
