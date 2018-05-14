import {
  CUSTOMER_LIST_API,
  LOCK_CUSTOMER_STATUS_API,
  UNLOCK_CUSTOMER_STATUS_API,
} from '../../constants';

import {
  GET_CUSTOMER_LIST,
  UPDATE_CUSTOMER_STATUS,
  UPDATE_CUSTOMER_LIST_STATUS,
  UPDATE_PAGE_SORT_CUSTOMER_LIST,
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


  export const updateCustomerStatus = (customer) => {
    const url = customer.status === 'ACTIVE' ? LOCK_CUSTOMER_STATUS_API : UNLOCK_CUSTOMER_STATUS_API;
    return {
      showMessage: {
        success: {
          title: 'Success!',
          message: 'Update customer status success',
        },
        error: {
          title: 'Error!',
          message: 'Update customer status failure',
        },
      },
      type: UPDATE_CUSTOMER_STATUS,
      others: {
        ...customer,
      },
      fetchConfig: {
        // TODO
        // need to change api name
        path: url,
        params: {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([customer]),
        },
      }
    };
  };
  
  export const updateCustomerListStatus = (customers, status) => {
    const url = status === 'ACTIVE' ? UNLOCK_CUSTOMER_STATUS_API : LOCK_CUSTOMER_STATUS_API;
    return {
      showMessage: {
        success: {
          title: 'Success!',
          message: 'Update customer status success',
        },
        error: {
          title: 'Error!',
          message: 'Update customer status failure',
        },
      },
      type: UPDATE_CUSTOMER_LIST_STATUS,
      fetchConfig: {
        // TODO
        // need to change api name
        path: url,
        params: {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customers),
        },
      }
    };
  };
