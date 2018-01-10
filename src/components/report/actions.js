import URLSearchParams from 'url-search-params';

import {
  GET_REPORT_API,
} from '../../constants';

import {
  GET_REPORT,
  UPDATE_SEARCH_REPORT,
} from './constants';

const parseParams = (search) => {
  const searchParams = new URLSearchParams({
    fromDate: search.value[0],
    toDate: search.value[1],
  });
  return searchParams.toString();
}

const updateSearch = (search) => {
  return {
    type: UPDATE_SEARCH_REPORT,
    search,
  };
}

export const getReport = (search) =>
  (dispatch) => {
    dispatch(updateSearch(search));
    const searchParams = parseParams(search);
    dispatch({
      type: GET_REPORT,
      fetchConfig: {
        path: `${GET_REPORT_API}?${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };
