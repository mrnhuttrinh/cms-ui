import {
  GET_USER_PROFILE_API,
  USER_CHANGE_PASSWORD_API,
} from '../../constants';

import {
  FETCH_USER_PROFILE,
  CHANGE_PASSWORD,
} from './constants';

export const getUserProfile = (id) => {
  return {
    type: FETCH_USER_PROFILE,
    fetchConfig: {
      path: GET_USER_PROFILE_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const pushPasswordChange = (values) => {
  return {
    type: CHANGE_PASSWORD,
    showMessage: {
      success: {
        title: 'Cập nhật mật khẩu',
        message: 'Cập nhật mật khẩu thành công',
      },
      error: {
        title: 'Cập nhật mật khẩu',
        message: 'Cập nhật mật khẩu thất bại',
      },
    },
    fetchConfig: {
      path: USER_CHANGE_PASSWORD_API,
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