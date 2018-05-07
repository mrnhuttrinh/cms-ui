import {
  ACCOUNT_LIST_API,
  LOCK_ACCOUNT_STATUS_API,
  UNLOCK_ACCOUNT_STATUS_API
} from '../../constants';

import {
  GET_ACCOUNT_LIST,
  UPDATE_PAGE_SORT_ACCOUNT_LIST,
  UPDATE_ACCOUNT_STATUS,
  UPDATE_ACCOUNT_LIST_STATUS,
} from './constants';

import { parseParams } from '../../utils';

const updatePageAndSort = (pageable, sort, search) => {
  return {
    type: UPDATE_PAGE_SORT_ACCOUNT_LIST,
    pageable,
    sort,
    search,
  };
}

export const getAccountList = (pageable, sort, search) =>
  (dispatch) => {
    dispatch(updatePageAndSort(pageable, sort, search));
    const searchParams = parseParams(pageable, sort, search);
    dispatch({
      type: GET_ACCOUNT_LIST,
      fetchConfig: {
        path: `${ACCOUNT_LIST_API}&${searchParams}`,
        params: {
          method: 'GET'
        },
      }
    });
  };

export const updateAccountStatus = (user) => {
  const url = user.status === 'ACTIVE' ? LOCK_ACCOUNT_STATUS_API : UNLOCK_ACCOUNT_STATUS_API;
  return {
    showMessage: {
      success: {
        title: 'Success!',
        message: 'Update account status success',
      },
      error: {
        title: 'Error!',
        message: 'Update account status failure',
      },
    },
    type: UPDATE_ACCOUNT_STATUS,
    others: {
      ...user,
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
        body: JSON.stringify([user]),
      },
    }
  };
};

export const updateAccountListStatus = (users, status) => {
  const url = status === 'ACTIVE' ? UNLOCK_ACCOUNT_STATUS_API : LOCK_ACCOUNT_STATUS_API;
  return {
    showMessage: {
      success: {
        title: 'Success!',
        message: 'Update account status success',
      },
      error: {
        title: 'Error!',
        message: 'Update account status failure',
      },
    },
    type: UPDATE_ACCOUNT_LIST_STATUS,
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
        body: JSON.stringify(users),
      },
    }
  };
};
