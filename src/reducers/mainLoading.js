import { Map } from 'immutable';
import {
  MAIN_LOADING_START,
  MAIN_LOADING_END,
  MAIN_LOADING_ERROR,
} from '../constants';


const initialState = new Map({
  loading: false,
  errorLoading: false,
});

export default (state = initialState, action = {}) => {
  let newState;
  switch (action.type) {
    case MAIN_LOADING_START:
      newState = state.set('loading', true).delete('errorLoading');
      break;
    case MAIN_LOADING_END:
      newState = state.set('loading', false).delete('errorLoading');
      break;
    case MAIN_LOADING_ERROR:
      newState = state.set('loading', false).set('errorLoading', true);
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
