import {
  CARDS_BY_ACCOUNT_API,
} from '../../../constants';

import {
  GET_ACCOUNT_CARDS,
} from './constants';

export const getCardsByAccountId = id => {
  return {
    type: GET_ACCOUNT_CARDS,
    fetchConfig: {
      path: CARDS_BY_ACCOUNT_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
