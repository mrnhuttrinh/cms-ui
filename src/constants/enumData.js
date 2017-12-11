export const ENUM_USER_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
};

export const ENUM_ROLE_TYPE = {
  ADMIN: 'Quản Trị Viên',
  USER: 'Người Dùng',
};

export const LANGUAGE_SELECTION = {
  vi: 'Tiếng việt',
  en: 'Tiếng anh',
}

export const UI_ROUTES_LEFT_SIDE_MENU = {
  DASHBOARD: {
    value: 'dashboard',
    text: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard',
  },
  CUSTOMER: {
    value: 'customer',
    text: 'Customer',
    icon: 'people',
    url: '/customer',
  },
  AGENT: {
    value: 'merchant',
    text: 'Merchant',
    icon: 'store',
    url: '/merchant',
  },
  CARD_SYSTEM: {
    value: 'card',
    text: 'Card',
    icon: 'credit_card',
    url: '/card',
  },
  ACCOUNT: {
    value: 'account',
    text: 'Account',
    icon: 'account_balance_wallet',
    url: '/account',
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
  },
  SETTING: {
    value: 'setting',
    text: 'Setting',
    icon: 'settings',
  },
  USER_PROFILE: {
    value: 'user-profile',
    text: 'User profile',
    icon: 'account_circle',
    url: '/user-profile',
  },
  LOGOUT: {
    value: 'logout',
    text: 'Logout',
    icon: 'exit_to_app',
  },
};
