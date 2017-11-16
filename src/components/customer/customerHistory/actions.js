import {
  ACCOUNT_HISTORY_BY_CUSTOMER_API,
} from '../../../constants';

import {
  GET_ACCOUNT_HISTORY_BY_CUSTOMER,
} from './constants';

export const getAccountHistoryByCustomerId = id => {
  return {
    type: GET_ACCOUNT_HISTORY_BY_CUSTOMER,
    fetchConfig: {
      path: ACCOUNT_HISTORY_BY_CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
