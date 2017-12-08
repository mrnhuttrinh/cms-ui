import {
  ACCOUNT_API,
  UPDATE_ACCOUNT_API,
} from '../../../constants';

import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
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

export const updateAccountStatus = account => {
  return {
    type: UPDATE_ACCOUNT,
    fetchConfig: {
      path: UPDATE_ACCOUNT_API,
      params: {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      },
    },
  };
};
