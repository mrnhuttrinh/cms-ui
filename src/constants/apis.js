// The constants store the api name

// for authenticate and related
export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';

// for customer and related
export const CUSTOMER_API = '/api/customers/{id}?projection=custom';
export const CUSTOMER_LIST_API = '/api/customers?projection=custom';
export const ACCOUNT_LIST_API = '/api/accounts/search?projection=custom';

// for account and related
export const ACCOUNT_BY_CUSTOMER_API = '/api/customers/{id}/accounts/?projection=custom';
export const CUSTOMER_HISTORY_API = '/api/customers/{id}/customerHistory';
export const ACCOUNT_API = '/api/accounts/{id}?projection=custom';

// for user and related
export const USER_LIST_API = '/api/users';
export const USER_DETAIL_API = '/api/users/{id}';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';

// for merchant and related
export const MERCHANT_LIST_API = '/api/merchants/?projection=custom';