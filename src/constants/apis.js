// The constants store the api name

// for authenticate and related
export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';

// for customer and related
export const CUSTOMER_API = '/api/customers/{id}?projection=custom';
export const CUSTOMER_LIST_API = '/api/customers?projection=custom';
export const ACCOUNT_LIST_API = '/api/accounts/search?projection=custom';
export const CARDS_BY_CUSTOMER_API = '/api/customers/{id}/cards?projection=custom';
export const ADDRESS_BY_CUSTOMER_API = '/api/customers/{id}/addresses?projection=custom';
export const IDENTIFY_DOCS_BY_CUSTOMER_API = '/api/customers/{id}/identifyDocuments?projection=custom';

// for account and related
export const ACCOUNT_BY_CUSTOMER_API = '/api/customers/{id}/accounts/?projection=custom';
export const CUSTOMER_HISTORY_API = '/api/customers/{id}/customerHistory?projection=custom';
export const ACCOUNT_API = '/api/accounts/{id}?projection=custom';

// for user and related
export const USER_LIST_API = '/api/users?projection=custom';
export const USER_DETAIL_API = '/api/users/{id}';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';
export const CARD_BY_ACCOUNT_API = '/api/accounts/{id}/cards?projection=custom';
export const ACCOUNT_HISTORY_BY_ACCOUNT_ID_API = '/api/accounts/{id}/accountHistories?projection=custom';
export const TRANSACTIONS_BY_ACCOUNT_ID_API = '/api/transactions?projection=custom&account.id={accountId}';

// for merchant and related
export const MERCHANT_LIST_API = '/api/merchants/?projection=custom';
