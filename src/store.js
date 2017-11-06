import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import { fetchMiddleware } from './utils';

export const history = createHistory();

const initialState = {}
const middleware = [
  thunk,
  promiseMiddleware,
  createLogger,
  fetchMiddleware,
  routerMiddleware(history)
];

const composedEnhancers = compose(applyMiddleware(...middleware));

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
);
