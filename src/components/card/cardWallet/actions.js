import {
  WALLET_BY_CARD_API,
  CREATE_CARD_WALLET_API,
  DISCONNECT_CARD_WALLET_API,
} from '../../../constants';

import {
  GET_CARD_WALLET,
  CREATE_CARD_WALLET,
  DISCONNECT_CARD_WALLET,
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

export const createNewWallet = cardNumber => {
  return {
    type: CREATE_CARD_WALLET,
    fetchConfig: {
      path: CREATE_CARD_WALLET_API,
      params: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card: {
            cardNumber,
          }
        }),
      },
    },
  };
};

export const disconnectWallet = id => {
  return {
    type: DISCONNECT_CARD_WALLET,
    fetchConfig: {
      path: DISCONNECT_CARD_WALLET_API.replace('{id}', id),
      params: {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  };
};
