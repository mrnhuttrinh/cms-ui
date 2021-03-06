import {
  ACCOUNT_BY_CUSTOMER_API,
} from '../../../constants';

import {
  GET_CUSTOMER_ACCOUNT,
} from './constants';

export const getAccountByCustomerId = id => {
  return {
    type: GET_CUSTOMER_ACCOUNT,
    fetchConfig: {
      path: ACCOUNT_BY_CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
