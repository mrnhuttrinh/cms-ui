import {
  ADD_NEW_USER_API
} from '../../constants';

import {
  ADD_NEW_USER,
  CLEAN_CACHE,
} from './constants';

export const cleanCache = () =>({
  type: CLEAN_CACHE,
});

export const addNewUser = (values) => {
  return {
    type: ADD_NEW_USER,
    showMessage: {
      success: {
        title: 'Add new user',
        message: 'Add new user successful',
      },
      error: {
        title: 'Add new user',
        message: 'Add new user failure',
      },
    },
    fetchConfig: {
      path: ADD_NEW_USER_API,
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
