import {
  CUSTOMER_API,
} from '../../constants';

import {
  GET_CUSTOMER,
} from './constants';

export const getCustomer = id => {
  return {
    type: GET_CUSTOMER,
    fetchConfig: {
      path: CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
