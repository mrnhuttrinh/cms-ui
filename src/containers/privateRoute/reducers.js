import { Map } from 'immutable';
import {
  TOGGLE_LEFT_MENU,
} from './constants';

const initialState = new Map({
  leftMenuState: false,
});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case TOGGLE_LEFT_MENU:
      const oldValue = state.get('leftMenuState');
      newState = state.set('leftMenuState', !oldValue);
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};
