import {
  ACCOUNT_API,
} from '../../constants';

import {
  GET_ACCOUNT,
} from './constants';

export const getAccountDetails = id => {
  return {
    type: GET_ACCOUNT,
    fetchConfig: {
      path: ACCOUNT_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
