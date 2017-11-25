import {
  CUSTOMER_HISTORY_API,
} from '../../../constants';

import {
  GET_CUSTOMER_HISTORY,
} from './constants';

export const getAccountHistoryByCustomerId = id => {
  return {
    type: GET_CUSTOMER_HISTORY,
    fetchConfig: {
      path: CUSTOMER_HISTORY_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
