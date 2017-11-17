import {
  LOGIN_API
} from '../../constants';

import {
  SUBMIT_LOGIN
} from './constants';

export const submitLogin = (username, password) => {
  return {
    type: SUBMIT_LOGIN,
    fetchConfig: {
      path: LOGIN_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
    }
  };
};
