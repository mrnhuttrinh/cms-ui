import fetch from 'isomorphic-fetch';
import {
  mainLoadingStart,
  mainLoadingEnd,
  mainLoadingError,
} from '../actions';

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
      if (res.status === 403) {
        // force redirect login
        // window.history.push('/login');
      }
      // handle common
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      // handle for authenticate
      return res.json();
    });
    // dispatch completed with data
    dispatch({ type: `${type}_COMPLETED`, data });
    if (showLoading) {
      dispatch(mainLoadingEnd());
    }
  } catch (error) {
    // dispatch failed with error
    dispatch({ type: `${type}_FAILED`, error });
    if (showLoading) {
      dispatch(mainLoadingError());
    }
  }
}

export default fetchMiddleware;
