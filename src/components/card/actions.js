import {
  CARD_API,
} from '../../constants';

import {
  GET_CARD,
} from './constants';

export const getCard = id => {
  return {
    type: GET_CARD,
    fetchConfig: {
      path: CARD_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
