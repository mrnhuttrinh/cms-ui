import { Map } from 'immutable';
import _ from 'lodash';
import { DEFAULT_LANGUAGE } from '../../constants';
import { getItem, setItem } from '../../utils';
import {
  SUBMIT_LOGIN,
  REFRESH_TOKEN,
  SIGN_OUT,
  CHANGE_LANGUAGE,
  CLEAN_ERROR,
  TURN_OFF_ALERT_MESSAGE,
} from './constants';

const initialState = new Map({
  refreshTokenRequesting: true,
  language: getItem('language') || DEFAULT_LANGUAGE,
});

const getPermission = (user) => {
  const permissions = [];
  _.forEach(user.roles,(role) => {
    _.forEach(role.permissions,(p) => {
      permissions.push(p.name);
    });
  });
  return permissions;
};

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    //////////////////////////// login
    case `${SUBMIT_LOGIN}_START`:
      newState = state
        .set('requesting', true)
        .delete('data')
        .delete('errorLogin')
        .delete('openAlertMessage');
      break;
    case `${SUBMIT_LOGIN}_COMPLETED`:
      newState = state
        .set('requesting', false)
        .set('data', {credential: true, user: action.data.data, permissions: getPermission(action.data.data)})
        .delete('errorLogin')
        .delete('openAlertMessage');
      break;
    case `${SUBMIT_LOGIN}_FAILED`:
      newState = state
        .set('requesting', false)
        .set('data', {credential: false})
        .set('errorLogin', action.error)
        .set('openAlertMessage', true);
      break;
    ///////////////////////// refresh token
    case `${REFRESH_TOKEN}_START`:
      newState = state.set('refreshTokenRequesting', true).delete('data').delete('errorRefreshToken');
      break;
    case `${REFRESH_TOKEN}_COMPLETED`:
      newState = state.set('refreshTokenRequesting', false).set('data', {credential: true, user: action.data.data, permissions: getPermission(action.data.data)});
      break;
    case `${REFRESH_TOKEN}_FAILED`:
      newState = state.set('refreshTokenRequesting', false).set('data', {credential: false}).set('errorRefreshToken', action.error);
      break;
    //////////////////////////// sign out
    case `${SIGN_OUT}_START`:
      newState = state.set('signOutRequesting', true).delete('data').delete('errorSignOut');
      break;
    case `${SIGN_OUT}_COMPLETED`:
      newState = state.set('signOutRequesting', false).set('data', {credential: false});
      break;
    case `${SIGN_OUT}_FAILED`:
      // force reload page
      newState = state.set('signOutRequesting', false).set('data', {credential: false});
      break;
    // change language
    case CHANGE_LANGUAGE:
      setItem('language', action.language);
      newState = state.set('language', action.language);
      break;
    // clean error
    case CLEAN_ERROR:
      newState = state.delete('errorLogin');
      break;
    // turn off alert message
    case TURN_OFF_ALERT_MESSAGE:
      newState = state
        .set('openAlertMessage', action.openAlertMessage);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
