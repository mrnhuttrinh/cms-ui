// The constants store the api name

export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';
export const CUSTOMER_API = '/api/customers/{id}?projection=custom';
export const ACCOUNT_BY_CUSTOMER_API = '/api/customers/{id}/accounts/?projection=custom';
export const CUSTOMER_HISTORY_API = '/api/customers/{id}/customerHistory';
export const USER_LIST_API = '/api/users';
export const USER_DETAIL_API = '/api/users/{id}';
export const CUSTOMER_LIST_API = '/api/customers?projection=custom';
export const ACCOUNT_LIST_API = '/api/accounts/search?projection=custom';
export const ACCOUNT_API = '/api/accounts/{id}?projection=custom';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';
