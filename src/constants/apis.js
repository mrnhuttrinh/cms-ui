// The constants store the api name

// for authenticate and related
export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';

// for customer and related
export const CUSTOMER_API = '/api/customers/{id}?projection=custom';
export const CUSTOMER_LIST_API = '/api/customers?projection=custom';
export const CARDS_BY_CUSTOMER_API = '/api/customers/{id}/cards?projection=custom';
export const ADDRESS_BY_CUSTOMER_API = '/api/customers/{id}/addresses?projection=custom';
export const IDENTIFY_DOCS_BY_CUSTOMER_API = '/api/customers/{id}/identifyDocuments?projection=custom';
export const CUSTOMER_HISTORY_API = '/api/customers/{id}/customerHistory?projection=custom';

// for account and related
export const ACCOUNT_LIST_API = '/api/accounts/search?projection=custom';
export const ACCOUNT_BY_CUSTOMER_API = '/api/customers/{id}/accounts/?projection=custom';
export const ACCOUNT_API = '/api/accounts/{id}?projection=custom';
export const CARD_BY_ACCOUNT_API = '/api/accounts/{id}/cards?projection=custom';
export const ACCOUNT_HISTORY_BY_ACCOUNT_ID_API = '/api/accounts/{id}/accountHistories?projection=custom';
export const TRANSACTIONS_BY_ACCOUNT_ID_API = '/api/transactions?projection=custom&account.id={accountId}';
export const UPDATE_ACCOUNT_API = '/api/account/update';

// for user and related
export const USER_LIST_API = '/api/users?projection=custom';
export const USER_DETAIL_API = '/api/users/{id}?projection=custom';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';

// for merchant and related
export const MERCHANT_LIST_API = '/api/merchants?projection=custom';
export const MERCHANT_DETAIL_API ='/api/merchants/{id}?projection=custom';
export const MERCHANT_TERMINAL_BY_MERCHANT_API = '/api/merchantTerminals?projection=custom&merchant.id={id}';
export const MERCHANT_HISTORY_API = '/api/merchantHistories?projection=custom&merchant.id={id}';

// for card and related
export const CARD_LIST_API = '/api/cards/search?projection=custom';
export const CARD_API = '/api/cards/{id}?projection=custom';
export const CARD_HISTORY_API = '/api/cards/{id}/cardHistories?projection=custom';
export const TRANSACTIONS_BY_CARD_API = '/api/transactions?projection=custom&card.cardNumber={cardNumber}';

// user
export const GET_USER_PROFILE_API ='/api/users?projection={id}';
export const USER_CHANGE_PASSWORD_API ='/api/users/change-password';
export const USER_RESET_PASSWORD_API ='/api/users/reset-password';