import {
  ACCOUNT_HISTORY_BY_ACCOUNT_ID_API,
} from '../../../constants';

import {
  GET_ACCOUNT_HISTORY,
} from './constants';

export const getAccountHistory = id => {
  return {
    type: GET_ACCOUNT_HISTORY,
    fetchConfig: {
      path: ACCOUNT_HISTORY_BY_ACCOUNT_ID_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
