import {
  USER_DETAIL_API,
  USER_HISTORY_API,
  USER_RESET_PASSWORD_API
} from '../../constants';

import {
  GET_USER_DETAIL,
  GET_USER_HISTORY,
  USER_RESET_PASSWORD,
} from './constants';

export const getUser = id => {
  return {
    type: GET_USER_DETAIL,
    fetchConfig: {
      path: USER_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

// fetch user history
export const getUserHistories = id => {
  return {
    type: GET_USER_HISTORY,
    fetchConfig: {
      path: USER_HISTORY_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const pushResetPassword = (values) => {
  return {
    type: USER_RESET_PASSWORD,
    showMessage: {
      success: {
        title: 'Reset mật khẩu',
        message: 'Reset mật khẩu thành công',
      },
      error: {
        title: 'Reset mật khẩu',
        message: 'Reset mật khẩu thất bại',
      },
    },
    fetchConfig: {
      path: USER_RESET_PASSWORD_API,
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
}