import {
  LOGIN_API,
  REFRESH_TOKEN_API,
  SIGN_OUT_API,
} from '../../constants';

import {
  SUBMIT_LOGIN,
  REFRESH_TOKEN,
  SIGN_OUT,
  CHANGE_LANGUAGE,
} from './constants';

export const submitLogin = (username, password, language) => {
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
          language,
        }),
      },
    }
  };
};

export const refreshLogin = async () => {
  return await {
    type: REFRESH_TOKEN,
    fetchConfig: {
      path: REFRESH_TOKEN_API,
      params: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    fetchConfig: {
      path: SIGN_OUT_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    }
  };
};

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    language,
  };
};