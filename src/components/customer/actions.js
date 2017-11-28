import {
  CUSTOMER_API,
  ADDRESS_BY_CUSTOMER_API,
  IDENTIFY_DOCS_BY_CUSTOMER_API,
} from '../../constants';

import {
  GET_CUSTOMER,
  GET_ADDRESS_CUSTOMER,
  GET_IDENTIFY_DOCS_CUSTOMER,
} from './constants';

export const getCustomer = id => {
  return {
    type: GET_CUSTOMER,
    fetchConfig: {
      path: CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const getAddressesByCustomerId = id => {
  return {
    type: GET_ADDRESS_CUSTOMER,
    fetchConfig: {
      path: ADDRESS_BY_CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};

export const getIdentifyDocsByCustomerId = id => {
  return {
    type: GET_IDENTIFY_DOCS_CUSTOMER,
    fetchConfig: {
      path: IDENTIFY_DOCS_BY_CUSTOMER_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};
