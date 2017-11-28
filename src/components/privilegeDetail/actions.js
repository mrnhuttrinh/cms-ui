import {
  USER_DETAIL_API,
  USER_HISTORY_API,
} from '../../constants';

import {
  GET_USER_DETAIL,
  GET_USER_HISTORY,
} from './constants';

export const getUser = id => {
  return {
    type: GET_USER_DETAIL,
    fetchConfig: {
      path: USER_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

// fetch user history
export const getUserHistories = id => {
  return {
    type: GET_USER_HISTORY,
    fetchConfig: {
      path: USER_HISTORY_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};