import {
  ADD_NEW_ROLE_API
} from '../../constants';

import {
  ADD_NEW_ROLE,
  CLEAN_CACHE,
} from './constants';

export const cleanCache = () =>({
  type: CLEAN_CACHE,
});

export const addNewRole = (values) => {
  return {
    type: ADD_NEW_ROLE,
    showMessage: {
      success: {
        title: 'Add new role',
        message: 'Add new role successful',
      },
      error: {
        title: 'Add new role',
        message: 'Add new role failure',
      },
    },
    fetchConfig: {
      path: ADD_NEW_ROLE_API,
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
