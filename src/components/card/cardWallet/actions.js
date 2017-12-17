import {
  WALLET_BY_CARD_API,
} from '../../../constants';

import {
  GET_CARD_WALLET,
} from './constants';

export const getWalletByCardId = id => {
  return {
    type: GET_CARD_WALLET,
    fetchConfig: {
      path: WALLET_BY_CARD_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
