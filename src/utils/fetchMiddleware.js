import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';
import i18n from '../i18n';
import {
  mainLoadingStart,
  mainLoadingEnd,
  mainLoadingError,
} from '../actions';

import {
  REFRESH_TOKEN,
  SUBMIT_LOGIN,
} from '../components/login/constants';

// guild create middle
// http://blog.jakegardner.me/consolidate-fetch-with-redux-middleware/index.html

const fetchMiddleware = store => next => async action => {
  if (!action || !action.fetchConfig) {
    return next(action);
  }

  const dispatch = store.dispatch;
  const config = action.fetchConfig;
  const type = action.type;
  const path = config.path;
  const params = { ...config.params, credentials: 'include' };
  const showMessage = action.showMessage;

  // for main loading
  const showLoading = action.showLoading || false;
  // can be add authenticate to fetch

  try {
    // dispatch start fetch
    dispatch({ type: `${type}_START` });
    if (showLoading) {
      dispatch(mainLoadingStart());
    }
    const data = await fetch(path, params).then(async (res) => {
      // authenticate error
      if (res.status === 403 && type !== REFRESH_TOKEN && type !== SUBMIT_LOGIN) {
        // force redirect login
        window.location.href = '/login';
      }
      // handle common
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      // handle for authenticate
      return res.json();
    });
    // dispatch completed with data
    await dispatch({ type: `${type}_COMPLETED`, data });
    if (showLoading) {
      dispatch(mainLoadingEnd());
    }
    if (showMessage) {
      const success = showMessage.success;
      setTimeout(() => {
        toastr.success(i18n.t(success.title), i18n.t(success.message));
      }, 0);
      
    }
    // show success existence message
  } catch (error) {
    // dispatch failed with error
    await dispatch({ type: `${type}_FAILED`, error });
    if (showLoading) {
      dispatch(mainLoadingError());
    }
    // show error existence message
    if (showMessage) {
      const error = showMessage.error;
      setTimeout(() => {
        toastr.error(i18n.t(error.title), i18n.t(error.message));
      }, 0);
    }
  }
}

export default fetchMiddleware;
