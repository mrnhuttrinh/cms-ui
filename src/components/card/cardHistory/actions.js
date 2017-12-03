import {
  CARD_HISTORY_API,
} from '../../../constants';

import {
  GET_CARD_HISTORY,
} from './constants';

export const getCardHistory = id => {
  return {
    type: GET_CARD_HISTORY,
    fetchConfig: {
      path: CARD_HISTORY_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
