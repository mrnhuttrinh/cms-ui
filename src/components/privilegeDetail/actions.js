import _ from 'lodash';

import {
  USER_DETAIL_API,
  USER_HISTORY_API,
  USER_RESET_PASSWORD_API,
  USER_UPDATE_STATUS_API,
  GET_ROLE_LIST_API,
  USER_UPDATE_INFORMATION_API,
} from '../../constants';

import {
  GET_USER_DETAIL,
  GET_USER_HISTORY,
  USER_RESET_PASSWORD,
  USER_UPDATE_STATUS,
  GET_ROLE_LIST,
  USER_UPDATE_INFORMATION,
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

// get role list
export const getRoleList = () =>
  (dispatch) => {
    dispatch({
      type: GET_ROLE_LIST,
      fetchConfig: {
        path: GET_ROLE_LIST_API,
        params: {
          method: 'GET'
        },
      }
    });
  };

  export const userUpdateInformation = (data) => {
    const roles = _.map(data.roles, rl => rl.id);
    const updateData = {
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roles
    }
    return {
      type: USER_UPDATE_INFORMATION,
      showRawErrorMessage: true,
      showMessage: {
        success: {
          title: 'Success!',
          message: 'Update user information success',
        },
        error: {
          title: 'Error!',
          message: 'Update user information failure',
        },
      },
      fetchConfig: {
        path: USER_UPDATE_INFORMATION_API,
        params: {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updateData
          }),
        },
      }
    };
  }