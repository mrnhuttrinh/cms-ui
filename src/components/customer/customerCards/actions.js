import {
  CARDS_BY_CUSTOMER_API,
} from '../../../constants';

import {
  GET_CUSTOMER_CARDS,
} from './constants';

export const getCardsByCustomerId = id => {
  return {
    type: GET_CUSTOMER_CARDS,
    fetchConfig: {
      path: CARDS_BY_CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
