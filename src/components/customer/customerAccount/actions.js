import fetch from 'isomorphic-fetch';
import {
  ACCOUNT_BY_CUSTOMER_API,
} from '../../../constants';

export const getAccountByCustomerId = id => {
  return fetch(ACCOUNT_BY_CUSTOMER_API.replace('{id}', id),{credentials: 'include'}).then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.json();
      });
};
