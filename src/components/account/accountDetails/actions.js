import {
  ACCOUNT_API,
  UPDATE_ACCOUNT_API,
  DEPOSIT_AMOUNT_TO_ACCOUNT_API,
} from '../../../constants';

import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  DEPOSIT_AMOUNT_TO_ACCOUNT,
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

export const depositToAccount = params => {
  return {
    type: DEPOSIT_AMOUNT_TO_ACCOUNT,
    showMessage: {
      success: {
        title: 'Deposit to account',
        message: 'Deposit to account successful',
      },
      error: {
        title: 'Deposit to account',
        message: 'Deposit to account failure',
      },
    },
    fetchConfig: {
      path: DEPOSIT_AMOUNT_TO_ACCOUNT_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    },
  };
};
