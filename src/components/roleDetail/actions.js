import {
  GET_ROLE_DETAIL_API,
} from '../../constants';

import {
  GET_ROLE_DETAIL,
} from './constants';

export const getRoleDetail = id => {
  return {
    type: GET_ROLE_DETAIL,
    fetchConfig: {
      path: GET_ROLE_DETAIL_API.replace('{id}', id),
      params: {
        method: 'GET'
      },
    }
  };
};