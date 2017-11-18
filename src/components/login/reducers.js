import { Map } from 'immutable';
import {
  SUBMIT_LOGIN,
  REFRESH_TOKEN,
  SIGN_OUT,
} from './constants';

const initialState = new Map({
  refreshTokenRequesting: true,
});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    //////////////////////////// login 
    case `${SUBMIT_LOGIN}_START`:
      newState = state.set('requesting', true).delete('data').delete('error');
      break;
    case `${SUBMIT_LOGIN}_COMPLETED`:
      newState = state.set('requesting', false).set('data', {credential: true});
      break;
    case `${SUBMIT_LOGIN}_FAILED`:
      newState = state.set('requesting', false).set('data', {credential: false}); 
      break;
    ///////////////////////// refresh token
    case `${REFRESH_TOKEN}_START`:
      newState = state.set('refreshTokenRequesting', true).delete('data').delete('error');
      break;
    case `${REFRESH_TOKEN}_COMPLETED`:
      newState = state.set('refreshTokenRequesting', false).set('data', {credential: true});
      break;
    case `${REFRESH_TOKEN}_FAILED`:
      newState = state.set('refreshTokenRequesting', false).set('data', {credential: false}).set('error', action.error);
      break;
    //////////////////////////// sign out 
    case `${SIGN_OUT}_START`:
      newState = state.set('requesting', true).delete('data').delete('error');
      break;
    case `${SIGN_OUT}_COMPLETED`:
      newState = state.set('requesting', false).set('data', {credential: false});
      break;
    case `${SIGN_OUT}_FAILED`:
      // force reload page
      window.location.reload();
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}