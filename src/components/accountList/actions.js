import URLSearchParams from 'url-search-params';
import {
  ACCOUNT_LIST_API,
} from '../../constants';

import {
  GET_ACCOUNT_LIST,
  UPDATE_PAGE_SORT_ACCOUNT_LIST,
} from './constants';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_ACCOUNT_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCustomer = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort));
    const params = {...pageable, sort:`${sort.key},${sort.type}`};
    if(search.value) {
      params[search.key] = search.value;
    }
    const searchParams = new URLSearchParams(params);
    dispatch({
      type: GET_ACCOUNT_LIST,
      fetchConfig: {
        path: `${ACCOUNT_LIST_API}?${searchParams.toString()}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
