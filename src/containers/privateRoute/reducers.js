import { Map } from 'immutable';
import {
  TOGGLE_LEFT_MENU,
  CHANGE_LANGUAGE_SETTING,
} from './constants';
import { setItem, getItem } from '../../utils';

const initialState = new Map({
  leftMenuState: getItem('leftSideMenu') || false,
  languageSetting: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const languageSetting = state.get('languageSetting');
  switch (action.type) {
    case TOGGLE_LEFT_MENU:
      const oldValue = state.get('leftMenuState');
      newState = state.set('leftMenuState', !oldValue);
      // write local storage
      setItem('leftSideMenu', !oldValue);
      break;
    ///////////////////////// language setting
    case `${CHANGE_LANGUAGE_SETTING}_START`:
      newState = state.set('languageSetting', languageSetting.set('requesting', true).delete('data').delete('error'));
      break;
    case `${CHANGE_LANGUAGE_SETTING}_COMPLETED`:
      newState = state.set('languageSetting', languageSetting.set('requesting', false).set('data', action.data));
      break;
    case `${CHANGE_LANGUAGE_SETTING}_FAILED`:
      newState = state.set('languageSetting', languageSetting.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
