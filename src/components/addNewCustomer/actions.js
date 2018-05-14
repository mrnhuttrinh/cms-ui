import {
  ADD_NEW_CUSTOMER_API
} from '../../constants';

import {
  ADD_NEW_CUSTOMER,
  CLEAN_CACHE,
} from './constants';

export const cleanCache = () =>({
  type: CLEAN_CACHE,
});

export const addNewCustomer = (values) => {
  return {
    type: ADD_NEW_CUSTOMER,
    showMessage: {
      success: {
        title: 'Add new customer',
        message: 'Add new customer successful',
      },
      error: {
        title: 'Add new customer',
        message: 'Add new customer failure',
      },
    },
    fetchConfig: {
      path: ADD_NEW_CUSTOMER_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    }
  };
};
