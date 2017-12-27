export const ENUM_USER_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
};

export const LANGUAGE_SELECTION = {
  vi: {
    text: 'Vietnamese',
    value: 'vi',
  },
  en: {
    text: 'English',
    value: 'en'
  }
};

export const DEFAULT_LANGUAGE = 'vi';

const _PERMISSIONS = {
  CUSTOMER_LIST_VIEW: 'CUSTOMER_LIST/VIEW_',
  CUSTOMER_DETAILS_VIEW: 'CUSTOMER_DETAILS/VIEW',
  ACCOUNT_LIST_VIEW: 'ACCOUNT_LIST/VIEW',
  ACCOUNT_DETAILS_VIEW: 'ACCOUNT_DETAILS/VIEW',
  ACCOUNT_DETAILS_LOCK: 'ACCOUNT_DETAILS/LOCK',
  ACCOUNT_DETAILS_UPDATE: 'ACCOUNT_DETAILS/UPDATE',
  CARD_LIST_VIEW: 'CARD_LIST/VIEW',
  CARD_DETAILS_VIEW: 'CARD_DETAILS/VIEW',
  CARD_DETAILS_CREATE_WALLET: 'CARD_DETAILS/CREATE_WALLET',
  CARD_DETAILS_REMOVE_WALLET: 'CARD_DETAILS/REMOVE_WALLET',
  WALLET_LIST_VIEW: 'WALLET_LIST/VIEW',
  MERCHANT_LIST_VIEW: 'MERCHANT_LIST/VIEW',
  MERCHANT_DETAIL_VIEW: 'MERCHANT_DETAIL/VIEW',
  USER_LIST_VIEW: 'USER_LIST/VIEW',
  USER_DETAIL_VIEW: 'USER_DETAIL/VIEW',
  USER_DETAIL_RESET_PASSWORD: 'USER_DETAIL/RESET_PASSWORD',
  USER_DETAIL_LOCK_UNLOCK: 'USER_DETAIL/LOCK_UNLOCK',
  USER_DETAIL_UPDATE: 'USER_DETAIL/UPDATE',
}

export const UI_ROUTES_LEFT_SIDE_MENU = {
  CUSTOMER: {
    value: 'customer',
    text: 'Customer',
    icon: 'people',
    url: '/customer',
    permission: _PERMISSIONS.CUSTOMER_LIST_VIEW,
  },
  ACCOUNT: {
    value: 'account',
    text: 'Account',
    icon: 'account_balance_wallet',
    url: '/account',
    permission: _PERMISSIONS.ACCOUNT_LIST_VIEW,
  },
  CARD_SYSTEM: {
    value: 'card',
    text: 'Card',
    icon: 'credit_card',
    url: '/card',
    permission: _PERMISSIONS.CARD_LIST_VIEW,
  },
  WALLET: {
    value: 'wallet',
    text: 'Wallet',
    icon: 'account_balance_wallet',
    url: '/wallet',
    permission: _PERMISSIONS.WALLET_LIST_VIEW,
  },
  AGENT: {
    value: 'merchant',
    text: 'Merchant',
    icon: 'store',
    url: '/merchant',
    permission: _PERMISSIONS.MERCHANT_LIST_VIEW,
  },
  REPORT: {
    value: 'report',
    text: 'Report',
    icon: 'assignment',
  },
  PERMISSION: {
    value: 'permission',
    text: 'Permission',
    icon: 'supervisor_account',
    url: '/permission',
    permission: _PERMISSIONS.USER_LIST_VIEW,
  },
  ROLE: {
    value: 'role',
    text: 'Role',
    icon: 'group_add',
    url: '/role',
  },
  SETTING: {
    value: 'setting',
    text: 'Setting',
    icon: 'settings',
  },
  LOGOUT: {
    value: 'logout',
    text: 'Logout',
    icon: 'exit_to_app',
  },
};

export const PERMISSIONS = _PERMISSIONS;
