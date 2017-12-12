import { Map } from 'immutable';
import { DEFAULT_LANGUAGE } from '../../constants';
import { getItem, setItem } from '../../utils';
import {
  SUBMIT_LOGIN,
  REFRESH_TOKEN,
  SIGN_OUT,
  CHANGE_LANGUAGE,
} from './constants';

const initialState = new Map({
  refreshTokenRequesting: true,
  language: getItem('language') || DEFAULT_LANGUAGE,
});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    //////////////////////////// login 
    case `${SUBMIT_LOGIN}_START`:
      newState = state.set('requesting', true).delete('data').delete('errorLogin');
      break;
    case `${SUBMIT_LOGIN}_COMPLETED`:
      newState = state.set('requesting', false).set('data', {credential: true, user: action.data.data}).delete('errorLogin');
      break;
    case `${SUBMIT_LOGIN}_FAILED`:
      newState = state.set('requesting', false).set('data', {credential: false}).set('errorLogin', true);
      break;
    ///////////////////////// refresh token
    case `${REFRESH_TOKEN}_START`:
      newState = state.set('refreshTokenRequesting', true).delete('data').delete('errorRefreshToken');
      break;
    case `${REFRESH_TOKEN}_COMPLETED`:
      newState = state.set('refreshTokenRequesting', false).set('data', {credential: true, user: action.data.data});
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
    default:
      newState = state;
      break;
  }

  return newState;
}
