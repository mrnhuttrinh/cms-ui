export const GET_MERCHANT_DETAIL = 'merchantDetail/GET_MERCHANT_DETAIL';

export const GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL = 'merchantDetail/GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL';

export const GET_MERCHANT_HISTORY = 'merchantDetail/GET_MERCHANT_HISTORY';

export const MERCHANT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

export const HISTORY_TYPE = {
  CREATED: {
    icon: 'new_releases',
    textNote: '',
    title: 'CREATED',
  },
  ADDED: {
    icon: 'note_add',
    textNote: '',
    title: 'Add new application',
  },
  UPDATED: {
    icon: 'mode_edit',
    textNote: '',
    title: 'Update status',
  }
};