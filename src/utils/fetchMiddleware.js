import fetch from 'isomorphic-fetch';

// guilde create middle
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

  // can be add authenticate to fetch

  try {
    // dispatch start fetch
    dispatch({ type: `${type}_START` });
    const data = await fetch(path, params).then(async (res) => {
      // authenticate error
      if (res.status === 403) {
        // force redirect login
        window.location.push('/login');
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
  } catch (error) {
    // dispatch failed with error
    dispatch({ type: `${type}_FAILED`, error });
  }
}

export default fetchMiddleware;
