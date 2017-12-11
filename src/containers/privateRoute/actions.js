import {
  USER_UPDATE_SETTING_API,
} from '../../constants';
import {
  TOGGLE_LEFT_MENU,
  CHANGE_LANGUAGE_SETTING,
} from './constants';

export const toggleLeftMenu = () => ({type: TOGGLE_LEFT_MENU});

export const languageSetting = (id, key, value) => {
  return {
    type: CHANGE_LANGUAGE_SETTING,
    showMessage: {
      success: {
        title: 'Thay đổi ngôn ngữ',
        message: 'Thay đổi ngôn ngữ thành công',
      },
      error: {
        title: 'Thay đổi ngôn ngữ',
        message: 'Thay đổi ngôn ngữ thất bại',
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