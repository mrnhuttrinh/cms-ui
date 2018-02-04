import {
  USER_UPDATE_SETTING_API,
  GET_ROLE_DETAIL_API,
} from '../../constants';
import {
  GET_ROLE_DETAIL,
  TOGGLE_LEFT_MENU,
  CHANGE_LANGUAGE_SETTING,
} from './constants';

export const toggleLeftMenu = () => ({type: TOGGLE_LEFT_MENU});

export const getRoleDetail = id => {
  return {
    type: GET_ROLE_DETAIL,
    fetchConfig: {
      path: GET_ROLE_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};


export const languageSetting = (id, key, value) => {
  return {
    type: CHANGE_LANGUAGE_SETTING,
    showMessage: {
      success: {
        title: 'Change language',
        message: 'Change language successful',
      },
      error: {
        title: 'Change language',
        message: 'Change language failure',
      },
    },
    fetchConfig: {
      path: USER_UPDATE_SETTING_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          key,
          value,
        }),
      },
    }
  };
};