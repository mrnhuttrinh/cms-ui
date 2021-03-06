// The constants store the api name

// for authenticate and related
export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';

// for customer and related
export const CUSTOMER_API = '/api/customers/{id}?projection=custom';
export const CUSTOMER_LIST_API = '/api/customers?projection=custom';
export const CARDS_BY_ACCOUNT_API = '/api/accounts/{id}/cards?projection=custom';
export const ADDRESS_BY_CUSTOMER_API = '/api/customers/{id}/addresses?projection=custom';
export const IDENTIFY_DOCS_BY_CUSTOMER_API = '/api/customers/{id}/identifyDocuments?projection=custom';
export const CUSTOMER_HISTORY_API = '/api/customers/{id}/customerHistory?projection=custom';
export const LOCK_CUSTOMER_STATUS_API = '/api/customers/lockCustomers';
export const UNLOCK_CUSTOMER_STATUS_API = '/api/customers/unlockCustomers';
export const ADD_NEW_CUSTOMER_API = '/api/customers/new';
export const UPDATE_CUSTOMER_API = '/api/customers/update';

// for account and related
export const ACCOUNT_LIST_API = '/api/accounts/search?projection=custom';
export const ACCOUNT_BY_CUSTOMER_API = '/api/customers/{id}/accounts/?projection=custom';
export const ACCOUNT_API = '/api/accounts/{id}?projection=custom';
export const CARD_BY_ACCOUNT_API = '/api/accounts/{id}/cards?projection=custom';
export const ACCOUNT_HISTORY_BY_ACCOUNT_ID_API = '/api/accounts/{id}/accountHistories?projection=custom';
export const TRANSACTIONS_BY_ACCOUNT_ID_API = '/api/transactions?projection=custom&account.id={accountId}';
export const UPDATE_ACCOUNT_API = '/api/account/update';
export const DEPOSIT_AMOUNT_TO_ACCOUNT_API = '/api/deposit';
export const LOCK_ACCOUNT_STATUS_API = '/api/account/lockAccounts';
export const UNLOCK_ACCOUNT_STATUS_API = '/api/account/unlockAccounts';

// for user and related
export const GET_USER_PROFILE_API ='/api/users?projection={id}';
export const USER_CHANGE_PASSWORD_API ='/api/users/change-password';
export const USER_RESET_PASSWORD_API ='/api/users/reset-password';
export const USER_LIST_API = '/api/users?projection=custom';
export const USER_DETAIL_API = '/api/users/{id}?projection=custom';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';
export const USER_UPDATE_STATUS_API = '/api/users/update-status';
export const USER_UPDATE_SETTING_API = '/api/users/update-setting';
export const USER_UPDATE_INFORMATION_API = '/api/users/update-information';
export const ADD_NEW_USER_API = '/api/user';

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

// for wallet and related
export const WALLET_LIST_API = '/api/wallets?projection=custom&status=ACTIVE';
export const WALLET_BY_CARD_API = '/api/cards/{id}/wallets?projection=custom';
export const CREATE_CARD_WALLET_API = '/api/createwallet';
export const DISCONNECT_CARD_WALLET_API = '/api/deletewallet/{id}';

// for role and related
export const GET_ROLE_LIST_API = '/api/roles?projection=custom';
export const GET_ROLE_DETAIL_API = '/api/roles/{id}?projection=custom';
export const GET_ROLE_PERMISSION_API = '/api/permissions?projection=custom&role.id={id}';
export const UPDATE_ROLE_PERMISSION_API = '/api/roles/update-permission/{id}';
export const ADD_NEW_ROLE_API = '/api/role';

// for permission
// get all permissions
export const GET_ALL_PERMISSION_API = `/api/permissions?projection=custom&size=${Math.pow(2,10)}&page=0`;

// for reports
export const GET_REPORT_API = '/api/report/general';
export const MERCHANT_STATEMENT_LIST_API = '/api/merchantStatements?projection=custom';
export const MERCHANT_STATEMENT_DETAILS_LIST_API = '/api/merchantStatementDetails?projection=custom';
