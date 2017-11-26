import { Map } from 'immutable';
import {
  TOGGLE_LEFT_MENU,
} from './constants';
import { setItem, getItem } from '../../utils';

const initialState = new Map({
  leftMenuState: getItem('leftSideMenu') || false,
});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case TOGGLE_LEFT_MENU:
      const oldValue = state.get('leftMenuState');
      newState = state.set('leftMenuState', !oldValue);
      // write local storage
      setItem('leftSideMenu', !oldValue);
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
