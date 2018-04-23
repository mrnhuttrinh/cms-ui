import {
  CUSTOMER_LIST_API,
  UPDATE_CUSTOMER_STATUS_API
} from '../../constants';

import {
  GET_CUSTOMER_LIST,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
  UPDATE_CUSTOMER_STATUS,
} from './constants';

import { parseParams } from '../../utils';

const updatePageSortSearch = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_CUSTOMER_LIST,
    pageable,
    sort,
    search,
  };
}

export const getCustomer = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageSortSearch(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_CUSTOMER_LIST,
      fetchConfig: {
        path: `${CUSTOMER_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };

export const updateCustomerStatus = (id, status) => {
  return {
    showMessage: {
      success: {
        title: 'Success!',
        message: 'Update user status success',
      },
      error: {
        title: 'Error!',
        message: 'Update user status failure',
      },
    },
    type: UPDATE_CUSTOMER_STATUS,
    others: {
      id: id,
    },
    fetchConfig: {
      // TODO
      // need to change api name
      path: UPDATE_CUSTOMER_STATUS_API.replace('{id}', id).replace('{status}', status),
      params: {
        method: 'PUT'
      },
    }
  };
};
