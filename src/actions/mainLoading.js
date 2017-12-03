import {
  MAIN_LOADING_START,
  MAIN_LOADING_END,
  MAIN_LOADING_ERROR,
} from '../constants';

export const mainLoadingStart = () => ({
  type: MAIN_LOADING_START,
});

export const mainLoadingEnd = () => ({
  type: MAIN_LOADING_END,
});

export const mainLoadingError = () => ({
  type: MAIN_LOADING_ERROR,
});

