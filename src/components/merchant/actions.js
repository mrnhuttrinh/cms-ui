import {
  MERCHANT_DETAIL_API,
  MERCHANT_TERMINAL_BY_MERCHANT_API,
} from '../../constants';


import {
  GET_MERCHANT_DETAIL,
  GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL,
} from './constants';

export const getMerchantDetail = id => {
  return {
    type: GET_MERCHANT_DETAIL,
    fetchConfig: {
      path: MERCHANT_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const getMerchantTerminalByMerchantIdDetail = id => {
  return {
    type: GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL,
    fetchConfig: {
      path: MERCHANT_TERMINAL_BY_MERCHANT_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};