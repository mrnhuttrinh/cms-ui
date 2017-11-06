import {
  LOGIN_API
} from '../../constants';

import {
  SUBMIT_LOGIN
} from './constants';

export const submitLogin = (email, password) => {
  return {
    type: SUBMIT_LOGIN,
    fetchConfig: {
      path: LOGIN_API,
      params: {
        method: 'GET'
      },
    }
  };
};