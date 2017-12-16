import {
  USER_DETAIL_API,
  USER_HISTORY_API,
  USER_RESET_PASSWORD_API,
  USER_UPDATE_STATUS_API,
} from '../../constants';

import {
  GET_USER_DETAIL,
  GET_USER_HISTORY,
  USER_RESET_PASSWORD,
  USER_UPDATE_STATUS,
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
        title: 'Reset password',
        message: 'Reset password successful',
      },
      error: {
        title: 'Reset password',
        message: 'Reset password failure',
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

export const userUpdateStatus = (id, status) => {
  const statusText = status === 'ACTIVE' ? 'Lock account' : 'Unlock account';
  return {
    type: USER_UPDATE_STATUS,
    showMessage: {
      success: {
        title: statusText,
        message: `${statusText} successful`,
      },
      error: {
        title: statusText,
        message: `${statusText} failure`,
      },
    },
    fetchConfig: {
      path: USER_UPDATE_STATUS_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
        }),
      },
    }
  };
}